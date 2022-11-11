package com.qnp.server.Repositories;

import com.qnp.server.Models.UsersModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends CrudRepository<UsersModel, Long> {

    UsersModel findByUsername(String username);

    UsersModel findByRefreshToken(String refreshToken);
}
