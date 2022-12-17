package com.qnp.server.Models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "plan")
@Data
public class PlanModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String name;

    @Lob
    private String description;

    private double price;

    private Long days;

    @OneToMany(mappedBy="plan", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<BillingModel> billing = new HashSet<>();

    // fix infinite loop
    public BillingModel getBilling() {
        return null;
    }

    public Set<BillingModel> billingCustomGet() {
        return billing;
    }

    //end fix infinite loop

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
