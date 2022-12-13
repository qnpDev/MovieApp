package com.qnp.server.Controllers.Admin;

import com.qnp.server.Models.BillingModel;
import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.BillingRepo;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import com.qnp.server.Utils.Socket.SocketModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/billing")
public class BillingAdminApi {
    @Autowired
    private BillingRepo billingRepo;

    @Autowired
    private SocketModule socketModule;

    @GetMapping
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(billingRepo.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<BillingModel> data = billingRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get());
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @PutMapping("{id}/confirm")
    public ResponseEntity<?> confirm(@PathVariable Long id){
        try{
            Optional<BillingModel> data = billingRepo.findById(id);
            if(data.isPresent()){
                BillingModel dataSave = data.get();
                if(dataSave.isConfirmed()){
                    return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, "Confirmed", null));
                }
                dataSave.setConfirmed(true);
                UsersModel user = dataSave.getUsers();

                Date today = new Date();
                if(user.getVip() != null && user.getVip().after(today)){
                    user.setVip(new Date(user.getVip().getTime() + (1000 * 60 * 60 * 24 * dataSave.getPlan().getDays())));
                }else{
                    user.setVip(new Date(today.getTime() + (1000 * 60 * 60 * 24 * dataSave.getPlan().getDays())));
                }
                dataSave.setUsers(user);
                dataSave = billingRepo.save(dataSave);
                socketModule.sendEvt("billing", dataSave);
                return ResponseEntity.ok(dataSave);
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            Optional<BillingModel> data = billingRepo.findById(id);
            if (data.isPresent()) {
                billingRepo.delete(data.get());
                return ResponseEntity.ok(new GeneralResponse(true, "success", null));
            } else {
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }
}
