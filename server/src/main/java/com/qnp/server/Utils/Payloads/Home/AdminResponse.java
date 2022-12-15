package com.qnp.server.Utils.Payloads.Home;

import com.qnp.server.Models.BillingModel;
import com.qnp.server.Models.MoviesModel;
import com.qnp.server.Models.UsersModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminResponse {
    Iterable<UsersModel> users;
    Iterable<MoviesModel> movies;
    Long movieCountActive;
    Long movieCountAll;
    Iterable<BillingModel> billing;
    double billingSummary;
    public AdminResponse() {
    }

}
