package com.qnp.server.Utils.Payloads.Home;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class BillingRequest {
    @DecimalMin("0.0")
    double amount;

    @NotBlank
    String payment;

    String description;

    @DecimalMin("0.0")
    Long planId;
}
