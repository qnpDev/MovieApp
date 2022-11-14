package com.qnp.server.Controllers.Admin;

import com.qnp.server.Models.CategoriesModel;
import com.qnp.server.Repositories.CategoriesRepo;
import com.qnp.server.Utils.Payloads.Admin.CategoriesAdminRequest;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/categories")
public class CategoriesApi {

    @Autowired
    CategoriesRepo  categoriesRepo;

    @GetMapping
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(categoriesRepo.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<CategoriesModel> data = categoriesRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get());
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CategoriesAdminRequest request){
        try{
            CategoriesModel data = new CategoriesModel();
            data.setName(request.getName());
            CategoriesModel dataSave = categoriesRepo.save(data);
            return ResponseEntity.ok(dataSave);
        }catch (Exception e){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, e.getMessage(), null));
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody CategoriesAdminRequest request){
        try{
            Optional<CategoriesModel> data = categoriesRepo.findById(id);
            if(data.isPresent()){
                CategoriesModel dataSave = data.get();
                dataSave.setName(request.getName());
                dataSave = categoriesRepo.save(dataSave);
                return ResponseEntity.ok(new GeneralResponse(true, "success", dataSave));
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
            Optional<CategoriesModel> data = categoriesRepo.findById(id);
            if (data.isPresent()) {
                categoriesRepo.delete(data.get());
                return ResponseEntity.ok(new GeneralResponse(true, "success", null));
            } else {
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }
}
