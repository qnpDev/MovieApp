package com.qnp.server.Controllers.Admin;

import com.qnp.server.Models.CategoriesModel;
import com.qnp.server.Models.SeriesModel;
import com.qnp.server.Repositories.CategoriesRepo;
import com.qnp.server.Repositories.SeriesRepo;
import com.qnp.server.Utils.Payloads.Admin.CategoriesAdminRequest;
import com.qnp.server.Utils.Payloads.Admin.SeriesAdminRequest;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/admin/series")
public class SeriesAdminApi {

    @Autowired
    private SeriesRepo seriesRepo;

    @Autowired
    private CategoriesRepo categoriesRepo;

    @GetMapping
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(seriesRepo.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<SeriesModel> data = seriesRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get());
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody SeriesAdminRequest request){
        try{
            SeriesModel data = new SeriesModel();
            data.setTitle(request.getTitle());
            data.setType(request.getType());
            List<CategoriesModel> categories = (List<CategoriesModel>) categoriesRepo.findAllById(request.getCategories());
            data.getCategories().addAll(categories);
            SeriesModel dataSave = seriesRepo.save(data);
            return ResponseEntity.ok(dataSave);
        }catch (Exception e){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, e.getMessage(), null));
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody SeriesAdminRequest request){
        try{
            Optional<SeriesModel> data = seriesRepo.findById(id);
            if(data.isPresent()){
                SeriesModel dataSave = data.get();
                dataSave.setTitle(request.getTitle());
                dataSave.setType(request.getType());
                if(request.getCategories().size() > 0){
                    List<CategoriesModel> categories = (List<CategoriesModel>) categoriesRepo.findAllById(request.getCategories());
                    dataSave.getCategories().clear();
                    dataSave.getCategories().addAll(categories);
                }else if(dataSave.getCategories() != null){
                    dataSave.getCategories().clear();
                }
                dataSave = seriesRepo.save(dataSave);
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
            Optional<SeriesModel> data = seriesRepo.findById(id);
            if (data.isPresent()) {
                seriesRepo.delete(data.get());
                return ResponseEntity.ok(new GeneralResponse(true, "success", null));
            } else {
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }
}
