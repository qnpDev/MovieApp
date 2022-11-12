package com.qnp.server.Repositories;

import com.qnp.server.Models.CategoriesModel;
import com.qnp.server.Models.UsersModel;
import org.springframework.data.repository.CrudRepository;

public interface CategoriesRepo extends CrudRepository<CategoriesModel, Long> {
    CategoriesModel findByName(String name);
}
