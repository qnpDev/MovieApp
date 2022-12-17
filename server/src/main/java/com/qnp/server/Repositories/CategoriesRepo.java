package com.qnp.server.Repositories;

import com.qnp.server.Models.CategoriesModel;
import com.qnp.server.Models.UsersModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CategoriesRepo extends CrudRepository<CategoriesModel, Long> {
    CategoriesModel findByName(String name);

    @Query("SELECT p FROM CategoriesModel p WHERE " +
            "p.name LIKE CONCAT('%',:query, '%')")
    Iterable<CategoriesModel> search(String query);
}
