package com.qnp.server.Utils.Payloads.Home;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class ReviewRequest {
    @NotBlank
    private String content;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    private float rating;

    @DecimalMin("0.0")
    private Long movieId;

}
