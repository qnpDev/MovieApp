package com.qnp.server.Utils.Payloads.Home;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class BillingRequest {
    @NotNull
    double amount;

    @NotBlank
    String payment;

    String description;

    @NotNull
    Long planId;
}
