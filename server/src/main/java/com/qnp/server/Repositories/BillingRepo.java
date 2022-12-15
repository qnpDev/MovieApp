package com.qnp.server.Repositories;

import com.qnp.server.Models.BillingModel;
import com.qnp.server.Models.UsersModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BillingRepo extends CrudRepository<BillingModel, Long> {
    List<BillingModel> findByUsers(UsersModel user);
    Iterable<BillingModel> findTop5ByOrderByIdDesc();

    @Query(value = "SELECT sum(amount) FROM BillingModel WHERE confirmed=true")
    double billingSummary();

    @Query("SELECT b from BillingModel b WHERE year(b.createdAt) = :year")
    Iterable<BillingModel> findByCreateYear(@Param("year") Integer year);
}
