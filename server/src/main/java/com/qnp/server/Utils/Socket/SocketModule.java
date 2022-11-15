package com.qnp.server.Utils.Socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.qnp.server.Models.ChatModel;
import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.ChatRepo;
import com.qnp.server.Repositories.UsersRepo;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SocketModule {
    private final SocketIOServer server;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private ChatRepo chatRepo;

    public SocketModule(SocketIOServer server) {
        this.server = server;
        this.server.addConnectListener(onConnected());
        this.server.addDisconnectListener(onDisconnected());
        this.server.addEventListener("send_message", SocketMessage.class, onChatReceived());

    }

    private DataListener<SocketMessage> onChatReceived() {
        return (client, data, ackSender) -> {
//            System.out.println(data.toString());
            JSONObject jsonObject = new JSONObject(data);
            String message = jsonObject.getString("message");
            UsersModel user = usersRepo.findById(jsonObject.getLong("uid")).get();
            ChatModel chat = new ChatModel();
            chat.setMessage(message);
            chat.setUsers(user);
            chat = chatRepo.save(chat);
            chat.getUsers().setPassword(null);
            chat.getUsers().setRefreshToken(null);

            for (SocketIOClient clientByRoom : server.getBroadcastOperations().getClients()) {
                clientByRoom.sendEvent("get_message", chat);
            }
        };
    }

    private ConnectListener onConnected() {
        return (client) -> {
//            String room = client.getHandshakeData().getSingleUrlParam("room");
//            client.joinRoom(room);
//            System.out.println("Socket ID[{}]  Connected to socket " + client.getSessionId().toString());
        };

    }

    private DisconnectListener onDisconnected() {
        return client -> {
//            System.out.println("Client[{}] - Disconnected from socket " + client.getSessionId().toString());
        };
    }
}
