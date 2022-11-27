package com.qnp.server.Controllers.Admin;

import com.qnp.server.Models.MoviesModel;
import com.qnp.server.Models.ReviewsModel;
import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.UsersRepo;
import com.qnp.server.Utils.Payloads.Admin.ReviewsAdminRequest;
import com.qnp.server.Utils.Payloads.Admin.UsersAdminRequest;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import com.qnp.server.Utils.jwt.JwtRefreshToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/users")
public class UsersAdminApi {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(usersRepo.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<UsersModel> data = usersRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get());
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UsersAdminRequest request){
        try{
            Optional<UsersModel> data = usersRepo.findById(id);
            if(data.isPresent()){
                UsersModel dataSave = data.get();
                dataSave.setName(request.getName());
                if(request.getPassword() != null){
                    dataSave.setPassword(passwordEncoder.encode(request.getPassword()));
                }
                dataSave.setEmail(request.getEmail());
                dataSave.setAvatar(request.getAvatar());
                if(request.getRoles()!= null){
                    String roles = null;
                    for(String role : request.getRoles())
                        roles += role + ",";
                    dataSave.setRoles(roles);
                }else if(dataSave.getRoles() != null){
                    dataSave.setRoles("ROLE_USER");
                }
                if(request.getVip() != null){
                    dataSave.setVip(Date.from(Instant.parse(request.getVip())));
                }
                dataSave = usersRepo.save(dataSave);
                return ResponseEntity.ok(dataSave);
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @PutMapping("{id}/lock")
    public ResponseEntity<?> updateLock(@PathVariable Long id){
        try{
            Optional<UsersModel> data = usersRepo.findById(id);
            if(data.isPresent()){
                UsersModel dataSave = data.get();
                dataSave.setActive(false);
                dataSave.setRefreshToken((new JwtRefreshToken()).generate());
                dataSave = usersRepo.save(dataSave);
                return ResponseEntity.ok(dataSave);
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @PutMapping("{id}/unlock")
    public ResponseEntity<?> updateUnLock(@PathVariable Long id){
        try{
            Optional<UsersModel> data = usersRepo.findById(id);
            if(data.isPresent()){
                UsersModel dataSave = data.get();
                dataSave.setActive(true);
                dataSave.setRefreshToken((new JwtRefreshToken()).generate());
                dataSave = usersRepo.save(dataSave);
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
            Optional<UsersModel> data = usersRepo.findById(id);
            if (data.isPresent()) {
                usersRepo.delete(data.get());
                return ResponseEntity.ok(new GeneralResponse(true, "success", null));
            } else {
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }
}
