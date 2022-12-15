package com.qnp.server.Repositories;

import com.qnp.server.Models.MoviesModel;
import org.springframework.data.repository.CrudRepository;

public interface MoviesRepo extends CrudRepository<MoviesModel, Long> {
    Iterable<MoviesModel> findByActiveTrue();
    Iterable<MoviesModel> findByActiveFalse();
}
