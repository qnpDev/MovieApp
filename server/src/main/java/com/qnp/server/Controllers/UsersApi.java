package com.qnp.server.Controllers;

import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.UsersRepo;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import com.qnp.server.Utils.Payloads.UsersRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UsersApi {

    @Autowired
    private UsersRepo usersRepo;

    @GetMapping()
    public ResponseEntity<?> get(){
        UsersModel data = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if(data != null){
            return ResponseEntity.ok(data);
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<UsersModel> data = usersRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get());
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @PutMapping()
    public ResponseEntity<?> update( @Valid @RequestBody UsersRequest request){
        try{
            UsersModel data = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
            if(data != null){
                if(request.getName() != null){
                    data.setName(request.getName());
                }
                if(request.getEmail()!= null){
                    data.setEmail(request.getEmail());
                }
                if(request.getAvatar() != null){
                    data.setAvatar(request.getAvatar());
                }
                usersRepo.save(data);
                return ResponseEntity.ok(data);
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

}
