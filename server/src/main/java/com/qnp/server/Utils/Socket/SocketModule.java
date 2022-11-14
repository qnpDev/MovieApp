package com.qnp.server.Utils.Socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.UsersRepo;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SocketModule {
    private final SocketIOServer server;

    @Autowired
    private UsersRepo usersRepo;

    public SocketModule(SocketIOServer server) {
        this.server = server;
        this.server.addConnectListener(onConnected());
        this.server.addDisconnectListener(onDisconnected());
        this.server.addEventListener("send_message", SocketMessage.class, onChatReceived());

    }

    private DataListener<SocketMessage> onChatReceived() {
        return (client, data, ackSender) -> {
            System.out.println(data.toString());
            JSONObject jsonObject = new JSONObject(data);
            String message = jsonObject.getString("message");
            System.out.println("message: " + message);
            System.out.println("id: " + jsonObject.getLong("id"));
            UsersModel user = usersRepo.findById(jsonObject.getLong("id")).get();
            for (SocketIOClient clientByRoom : server.getBroadcastOperations().getClients()) {
                clientByRoom.sendEvent("get_message", new SocketMessage(message, jsonObject.getLong("id")));
            }
        };
    }

    private ConnectListener onConnected() {
        return (client) -> {
//            String room = client.getHandshakeData().getSingleUrlParam("room");
//            client.joinRoom(room);
            System.out.println("Socket ID[{}]  Connected to socket " + client.getSessionId().toString());
        };

    }

    private DisconnectListener onDisconnected() {
        return client -> {
            System.out.println("Client[{}] - Disconnected from socket " + client.getSessionId().toString());
        };
    }
}
