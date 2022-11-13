package com.qnp.server.Utils.Payloads.Auth;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class ResetPassRequest {
    @NotBlank
    String username;

    @NotBlank
    String email;

    @NotBlank
    String path;
}
