package com.qnp.server.Repositories;

import com.qnp.server.Models.BillingModel;
import com.qnp.server.Models.UsersModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BillingRepo extends CrudRepository<BillingModel, Long> {
    List<BillingModel> findByUsers(UsersModel user);
}
