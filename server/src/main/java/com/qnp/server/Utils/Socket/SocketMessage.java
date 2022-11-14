package com.qnp.server.Utils.Socket;

import com.qnp.server.Models.UsersModel;
import lombok.Data;

@Data
public class SocketMessage {
    private String message;

    private Long id;

    public SocketMessage(){}

    public SocketMessage(String message, Long id){
        this.message = message;
        this.id = id;
    }
}
