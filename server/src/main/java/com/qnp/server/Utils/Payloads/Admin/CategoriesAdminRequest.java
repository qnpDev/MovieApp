package com.qnp.server.Utils.Payloads.Admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class CategoriesAdminRequest {
    @NotBlank
    private String name;
}
