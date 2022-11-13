package com.qnp.server.Models;

import com.fasterxml.uuid.Generators;
import com.qnp.server.Utils.jwt.JwtRefreshToken;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

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

    private String roles = "ROLE_USER";

    private String refreshToken = (new JwtRefreshToken()).generate();

    private Date vip;

    private boolean active = true;

    @OneToMany(mappedBy="users")
    private Set<ReviewsModel> reviews;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
