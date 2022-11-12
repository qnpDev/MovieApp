package com.qnp.server.Models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "series")
@Data
@NoArgsConstructor
public class SeriesModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String type;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "series_categories",
            joinColumns = { @JoinColumn(name = "series_id") },
            inverseJoinColumns = { @JoinColumn(name = "categories_id") }
    )
    Set<CategoriesModel> categories = new HashSet<>();

    @OneToMany(mappedBy = "series")
    private Set<MoviesModel> movies = new HashSet<>();

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
