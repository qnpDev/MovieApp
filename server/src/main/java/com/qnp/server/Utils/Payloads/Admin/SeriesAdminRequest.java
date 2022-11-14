package com.qnp.server.Utils.Payloads.Admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
public class SeriesAdminRequest {
    @NotBlank
    String title;

    @NotBlank
    String type;

    List<Long> categories;
}
