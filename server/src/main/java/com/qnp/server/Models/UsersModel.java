package com.qnp.server.Models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.uuid.Generators;
import com.qnp.server.Utils.jwt.JwtRefreshToken;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class UsersModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    private String email;

    private String name;

    private String avatar;

    private String roles;

    private String refreshToken = (new JwtRefreshToken()).generate();

    private Date vip;

    private boolean active = true;

    @OneToMany(mappedBy="users", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<ReviewsModel> reviews = new HashSet<>();

    // fix infinite loop
    public MoviesModel getReviews() {
        return null;
    }

    public Set<ReviewsModel> reviewsCustomGet() {
        return reviews;
    }

    public int getReviewsCount() {
        return reviews.size();
    }
    //end fix infinite loop

    @OneToMany(mappedBy="users", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<ChatModel> chat = new HashSet<>();

    // fix infinite loop
    public ChatModel getChat() {
        return null;
    }

    public Set<ChatModel> chatCustomGet() {
        return chat;
    }
    //end fix infinite loop

    @OneToMany(mappedBy="users", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<TransactionModel> transaction = new HashSet<>();

    // fix infinite loop
    public TransactionModel getTransaction() {
        return null;
    }

    public Set<ReviewsModel> transactionCustomGet() {
        return reviews;
    }

//    public int getTransactionCount() {
//        return reviews.size();
//    }
    //end fix infinite loop

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
