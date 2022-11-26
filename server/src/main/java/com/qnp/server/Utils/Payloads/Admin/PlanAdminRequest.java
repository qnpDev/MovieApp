package com.qnp.server.Utils.Payloads.Admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class PlanAdminRequest {
    @NotBlank
    String name;

    @NotBlank
    double price;

    String description;

    @NotBlank
    Long days;

}
