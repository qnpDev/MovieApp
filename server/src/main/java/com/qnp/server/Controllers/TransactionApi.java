package com.qnp.server.Controllers;

import com.qnp.server.Models.MoviesModel;
import com.qnp.server.Models.SeriesModel;
import com.qnp.server.Models.TransactionModel;
import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.TransactionRepo;
import com.qnp.server.Repositories.UsersRepo;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class TransactionApi {
    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private UsersRepo usersRepo;

    @GetMapping
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(transactionRepo.findAll());
    }

    @GetMapping()
    public ResponseEntity<?> getByUser(){
        UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        List<TransactionModel> data = transactionRepo.findByUsers(user);
        return ResponseEntity.ok(data);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<TransactionModel> data = transactionRepo.findById(id);
        if(data.isPresent()){
            UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
            TransactionModel trans = data.get();
            if(trans.getUsers().getId() == user.getId()){
                return ResponseEntity.ok(data.get());
            }else{
                ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body(new GeneralResponse(false, "Not match user get", null));
            }
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

}
