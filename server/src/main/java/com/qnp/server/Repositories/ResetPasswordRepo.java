package com.qnp.server.Repositories;

import com.qnp.server.Models.ResetPasswordModel;
import org.springframework.data.repository.CrudRepository;

public interface ResetPasswordRepo extends CrudRepository<ResetPasswordModel, Long> {
    ResetPasswordModel findByToken(String token);
}
