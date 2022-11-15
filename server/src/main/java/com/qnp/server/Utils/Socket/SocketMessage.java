package com.qnp.server.Utils.Socket;

import com.qnp.server.Models.UsersModel;
import lombok.Data;

@Data
public class SocketMessage {
    private String message;

    private Long uid;

    public SocketMessage(){}

    public SocketMessage(String message, Long uid){
        this.message = message;
        this.uid = uid;
    }
}
