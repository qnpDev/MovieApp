package com.qnp.server.Repositories;

import com.qnp.server.Models.PlanModel;
import org.springframework.data.repository.CrudRepository;

public interface PlanRepo extends CrudRepository<PlanModel, Long> {
}
