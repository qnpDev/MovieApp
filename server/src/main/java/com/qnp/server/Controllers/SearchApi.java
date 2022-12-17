package com.qnp.server.Controllers;

import com.qnp.server.Repositories.CategoriesRepo;
import com.qnp.server.Repositories.MoviesRepo;
import com.qnp.server.Repositories.SeriesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchApi {
    @Autowired
    MoviesRepo moviesRepo;

    @Autowired
    SeriesRepo seriesRepo;

    @Autowired
    CategoriesRepo categoriesRepo;

    @GetMapping("/movies")
    public ResponseEntity<?> get(@RequestParam String query){
        return ResponseEntity.ok(moviesRepo.search(query));
    }

    @GetMapping("/series")
    public ResponseEntity<?> getSeries(@RequestParam String query){
        return ResponseEntity.ok(seriesRepo.search(query));
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(@RequestParam String query){
        return ResponseEntity.ok(categoriesRepo.search(query));
    }
}
