package com.qnp.server.Repositories;

import com.qnp.server.Models.SeriesModel;
import org.springframework.data.repository.CrudRepository;

public interface SeriesRepo extends CrudRepository<SeriesModel, Long> {
}
