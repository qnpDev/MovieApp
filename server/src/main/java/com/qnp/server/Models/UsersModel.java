package com.qnp.server.Models;

import com.qnp.server.Utils.jwt.JwtRefreshToken;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    private Set<BillingModel> billing = new HashSet<>();

    // fix infinite loop
    public BillingModel getBilling() {
        return null;
    }

    public Set<BillingModel> billingCustomGet() {
        return billing;
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
