package com.qnp.server.Controllers;

import com.qnp.server.Models.*;
import com.qnp.server.Repositories.BillingRepo;
import com.qnp.server.Repositories.PlanRepo;
import com.qnp.server.Repositories.UsersRepo;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import com.qnp.server.Utils.Payloads.Home.BillingRequest;
import com.qnp.server.Utils.Socket.SocketModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/billing")
public class BillingApi {
    @Autowired
    private BillingRepo billingRepo;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private PlanRepo planRepo;

    @GetMapping()
    public ResponseEntity<?> getByUser(){
        UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        List<BillingModel> data = billingRepo.findByUsers(user);
        return ResponseEntity.ok(data);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<BillingModel> data = billingRepo.findById(id);
        if(data.isPresent()){
            UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
            BillingModel trans = data.get();
            if(trans.getUsers().getId() == user.getId()){
                return ResponseEntity.ok(data.get());
            }else{
                ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body(new GeneralResponse(false, "Not match user get", null));
            }
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody BillingRequest request){
        try{
            BillingModel data = new BillingModel();
            UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
            Optional<PlanModel> getPlan = planRepo.findById(request.getPlanId());
            if(getPlan.isPresent()){
                PlanModel plan = getPlan.get();
                data.setAmount(request.getAmount());
                data.setPayment(request.getPayment());
                data.setDescription(request.getDescription());
                data.setPlan(plan);
                data.setUsers(user);
                data = billingRepo.save(data);
                return ResponseEntity.ok(data);
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, "not found plan", null));
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, e.getMessage(), null));
        }
    }

}
