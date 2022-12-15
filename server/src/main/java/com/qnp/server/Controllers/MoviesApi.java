package com.qnp.server.Controllers;

import com.qnp.server.Models.MoviesModel;
import com.qnp.server.Repositories.MoviesRepo;
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
@RequestMapping("/api/movie")
public class MoviesApi {

    @Autowired
    private MoviesRepo moviesRepo;

    @GetMapping
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(moviesRepo.findByActiveTrue());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<MoviesModel> data = moviesRepo.findById(id);
        if(data.isPresent()){
            MoviesModel movie = data.get();
            if(movie.isActive()){
                return ResponseEntity.ok(movie);
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
            }
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }

    @GetMapping("{id}/reviews")
    public ResponseEntity<?> getReviewsById(@PathVariable Long id){
        Optional<MoviesModel> data = moviesRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get().getReviews());
        }
        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
    }
}
