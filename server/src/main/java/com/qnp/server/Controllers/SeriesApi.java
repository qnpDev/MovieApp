package com.qnp.server.Controllers;

import com.qnp.server.Models.CategoriesModel;
import com.qnp.server.Models.SeriesModel;
import com.qnp.server.Repositories.SeriesRepo;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@RestController
@RequestMapping("/api/seri")
public class SeriesApi {

    @Autowired
    private SeriesRepo seriesRepo;

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

    @GetMapping("{id}/movie")
    public ResponseEntity<?> getMoviesById(@PathVariable Long id){
        Optional<SeriesModel> data = seriesRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get().moviesCustomGet());
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }
}
