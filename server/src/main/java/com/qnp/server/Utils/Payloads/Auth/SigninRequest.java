package com.qnp.server.Utils.Payloads.Auth;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class SigninRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;


}
