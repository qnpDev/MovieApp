package com.qnp.server.Repositories;

import com.qnp.server.Models.ChatModel;
import com.qnp.server.Models.UsersModel;
import org.springframework.data.repository.CrudRepository;

public interface ChatRepo extends CrudRepository<ChatModel, Long> {
    ChatModel findByUsers(UsersModel usersModel);
}
