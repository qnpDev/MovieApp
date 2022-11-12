package com.qnp.server.Utils.Payloads.Auth;

import com.qnp.server.Models.UsersModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignupResponse {
    private boolean success;

    private String message;

    private String token;

    private UsersModel user;
}
