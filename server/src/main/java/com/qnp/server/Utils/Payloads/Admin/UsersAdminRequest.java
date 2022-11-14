package com.qnp.server.Utils.Payloads.Admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
public class UsersAdminRequest {
    @NotBlank
    private String name;

    private String password;

    @NotBlank
    private String email;

    @NotBlank
    private String avatar;

    private List<String> roles;

    private String vip;

}
