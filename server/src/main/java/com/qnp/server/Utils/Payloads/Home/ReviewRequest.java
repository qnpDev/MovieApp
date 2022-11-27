package com.qnp.server.Utils.Payloads.Home;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class ReviewRequest {
    @NotBlank
    private String content;

    @NotNull
    private float rating;

    @NotNull
    private Long movieId;

}
