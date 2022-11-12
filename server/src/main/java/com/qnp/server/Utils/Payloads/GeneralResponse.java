package com.qnp.server.Utils.Payloads;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GeneralResponse {
    private boolean success;
    private String message;
    private Object data;
}
