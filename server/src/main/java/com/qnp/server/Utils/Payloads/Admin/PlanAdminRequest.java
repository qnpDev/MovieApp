package com.qnp.server.Utils.Payloads.Admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class PlanAdminRequest {
    @NotBlank
    String name;

    @DecimalMin("0.0")
    double price;

    String description;

    @DecimalMin("0.0")
    Long days;

}
