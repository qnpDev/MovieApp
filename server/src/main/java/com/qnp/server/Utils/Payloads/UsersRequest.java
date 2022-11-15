package com.qnp.server.Utils.Payloads;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsersRequest {
    private String name;

    private String email;

    private String avatar;
}
