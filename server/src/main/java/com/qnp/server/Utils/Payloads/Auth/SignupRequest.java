package com.qnp.server.Utils.Payloads.Auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignupRequest {
    private String username;
    private String password;
    private String email;
    private String name;
}
