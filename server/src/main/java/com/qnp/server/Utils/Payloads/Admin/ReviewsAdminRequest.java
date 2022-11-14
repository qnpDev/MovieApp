package com.qnp.server.Utils.Payloads.Admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class ReviewsAdminRequest {
    @NotBlank
    private String content;

    @NotNull
    private float rating;
}
