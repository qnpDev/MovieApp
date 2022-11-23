package com.qnp.server.Models;

import com.fasterxml.uuid.Generators;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "transaction")
@Data
@NoArgsConstructor
public class TransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double amount;

    private boolean confirmed = false;

    private String payment;

    @Column(unique = true)
    private String code = Generators.randomBasedGenerator().generate().toString();

    private String description;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private UsersModel users;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
