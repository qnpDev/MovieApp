package com.qnp.server.Repositories;

import com.qnp.server.Models.MoviesModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MoviesRepo extends CrudRepository<MoviesModel, Long> {
    Iterable<MoviesModel> findByActiveTrue();
    Iterable<MoviesModel> findByActiveFalse();
    Iterable<MoviesModel> findTop5ByOrderByIdDesc();

    @Query(value = "SELECT count(*) FROM MoviesModel WHERE active=true")
    Long movieCount();

    @Query(value = "SELECT count(*) FROM MoviesModel")
    Long movieCountAll();
}
