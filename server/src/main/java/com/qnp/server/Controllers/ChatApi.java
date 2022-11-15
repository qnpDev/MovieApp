package com.qnp.server.Controllers;

import com.qnp.server.Models.CategoriesModel;
import com.qnp.server.Models.ChatModel;
import com.qnp.server.Repositories.ChatRepo;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat")
public class ChatApi {

    @Autowired
    private ChatRepo chatRepo;

    @GetMapping
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(chatRepo.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<ChatModel> data = chatRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get());
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @DeleteMapping()
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> clear(){
        try {
            chatRepo.deleteAll();
            return ResponseEntity.ok(new GeneralResponse(true, "success", null));
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @DeleteMapping("{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            Optional<ChatModel> data = chatRepo.findById(id);
            if (data.isPresent()) {
                chatRepo.delete(data.get());
                return ResponseEntity.ok(new GeneralResponse(true, "success", null));
            } else {
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

}
