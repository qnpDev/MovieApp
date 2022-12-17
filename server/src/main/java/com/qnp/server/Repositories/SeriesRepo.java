package com.qnp.server.Repositories;

import com.qnp.server.Models.SeriesModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SeriesRepo extends CrudRepository<SeriesModel, Long> {
    @Query("SELECT p FROM SeriesModel p WHERE " +
            "p.title LIKE CONCAT('%',:query, '%')")
    Iterable<SeriesModel> search(String query);
}
