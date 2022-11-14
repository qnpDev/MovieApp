package com.qnp.server.Utils.Payloads.Auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SigninResponse {
    private String token;
    private String refreshToken;
    private Object user;
}

