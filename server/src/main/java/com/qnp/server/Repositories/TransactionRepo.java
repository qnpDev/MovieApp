package com.qnp.server.Repositories;

import com.qnp.server.Models.TransactionModel;
import com.qnp.server.Models.UsersModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TransactionRepo extends CrudRepository<TransactionModel, Long> {
    List<TransactionModel> findByUsers(UsersModel user);
}
