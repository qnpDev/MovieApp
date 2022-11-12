package com.qnp.server.Repositories;

import com.qnp.server.Models.ReviewsModel;
import org.springframework.data.repository.CrudRepository;

public interface ReviewsRepo extends CrudRepository<ReviewsModel, Long> {

}
