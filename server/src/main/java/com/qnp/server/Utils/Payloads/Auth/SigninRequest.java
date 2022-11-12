package com.qnp.server.Utils.Payloads.Auth;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class SigninRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    public SigninRequest() {
    }

    public SigninRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
