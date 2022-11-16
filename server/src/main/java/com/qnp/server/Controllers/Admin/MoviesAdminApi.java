package com.qnp.server.Controllers.Admin;

import com.qnp.server.Models.CategoriesModel;
import com.qnp.server.Models.MoviesModel;
import com.qnp.server.Repositories.CategoriesRepo;
import com.qnp.server.Repositories.MoviesRepo;
import com.qnp.server.Repositories.SeriesRepo;
import com.qnp.server.Utils.Payloads.Admin.MoviesAdminRequest;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/movies")
public class MoviesAdminApi {
    @Autowired
    private MoviesRepo moviesRepo;

    @Autowired
    private CategoriesRepo categoriesRepo;

    @Autowired
    private SeriesRepo seriesRepo;

    @GetMapping
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(moviesRepo.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<MoviesModel> data = moviesRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get());
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody MoviesAdminRequest request){
        try{
            MoviesModel data = new MoviesModel();
            data.setTitle(request.getTitle());
            data.setDescription(request.getDescription());
            data.setImgTitle(request.getImgTitle());
            data.setImgSm(request.getImgSm());
            data.setTrailer(request.getTrailer());
            data.setVideo(request.getVideo());
            data.setYear(request.getYear());
            data.setLimitAge(request.getLimitAge());
            data.setActive(request.isActive());
            data.setVip(request.isVip());
            data.setSeries(seriesRepo.findById(request.getSeries()).get());
            List<CategoriesModel> categories = (List<CategoriesModel>) categoriesRepo.findAllById(request.getCategories());
            data.getCategories().addAll(categories);
            MoviesModel dataSave = moviesRepo.save(data);
            return ResponseEntity.ok(dataSave);
        }catch (Exception e){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, e.getMessage(), null));
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody MoviesAdminRequest request){
        try{
            Optional<MoviesModel> data = moviesRepo.findById(id);
            if(data.isPresent()){
                MoviesModel dataSave = data.get();
                dataSave.setDescription(request.getDescription());
                dataSave.setTitle(request.getTitle());
                dataSave.setImgSm(request.getImgSm());
                dataSave.setImgTitle(request.getImgTitle());
                dataSave.setTrailer(request.getTrailer());
                dataSave.setVideo(request.getVideo());
                dataSave.setYear(request.getYear());
                dataSave.setLimitAge(request.getLimitAge());
                dataSave.setActive(request.isActive());
                dataSave.setVip(request.isVip());
                dataSave.setSeries(seriesRepo.findById(request.getSeries()).get());
                if(request.getCategories().size() > 0){
                    List<CategoriesModel> categories = (List<CategoriesModel>) categoriesRepo.findAllById(request.getCategories());
                    dataSave.getCategories().clear();
                    dataSave.getCategories().addAll(categories);
                }else if(dataSave.getCategories() != null){
                    dataSave.getCategories().clear();
                }
                dataSave = moviesRepo.save(dataSave);
                return ResponseEntity.ok(dataSave);
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @PutMapping("{id}/show")
    public ResponseEntity<?> updateShowTrue(@PathVariable Long id){
        try{
            Optional<MoviesModel> data = moviesRepo.findById(id);
            if(data.isPresent()){
                MoviesModel dataSave = data.get();
                dataSave.setActive(true);
                dataSave = moviesRepo.save(dataSave);
                return ResponseEntity.ok(dataSave);
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @PutMapping("{id}/hide")
    public ResponseEntity<?> updateShowFalse(@PathVariable Long id){
        try{
            Optional<MoviesModel> data = moviesRepo.findById(id);
            if(data.isPresent()){
                MoviesModel dataSave = data.get();
                dataSave.setActive(false);
                dataSave = moviesRepo.save(dataSave);
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
            Optional<MoviesModel> data = moviesRepo.findById(id);
            if (data.isPresent()) {
                moviesRepo.delete(data.get());
                return ResponseEntity.ok(new GeneralResponse(true, "success", null));
            } else {
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }


}
