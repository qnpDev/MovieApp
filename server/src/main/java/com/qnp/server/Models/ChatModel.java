package com.qnp.server.Models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.awt.*;

@Entity
@Table(name = "chat")
@Data
@NoArgsConstructor
public class ChatModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String message;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private UsersModel users;
}
