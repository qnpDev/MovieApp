package com.qnp.server.Utils.Payloads.Admin;

import com.qnp.server.Models.CategoriesModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
public class MoviesAdminRequest {
    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String imgTitle;

    @NotBlank
    private String imgSm;

    @NotBlank
    private String trailer;

    @NotBlank
    private String video;

    @NotBlank
    private String year;

    @NotNull
    private int limitAge;

    private boolean active = true;

    private boolean vip = false;

    List<Long> categories = null;

    private Long series = null;
}
