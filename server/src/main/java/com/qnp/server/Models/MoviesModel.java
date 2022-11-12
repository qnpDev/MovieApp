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
@Table(name = "movies")
@Data
@NoArgsConstructor
public class MoviesModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String imgTitle;

    private String imgSm;

    private String trailer;

    private String video;

    private String year;

    private int limitAge;

    private boolean isSeries;

    @ManyToOne
    @JoinColumn(name="series_id")
    private SeriesModel series;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "movies_categories",
            joinColumns = { @JoinColumn(name = "movies_id") },
            inverseJoinColumns = { @JoinColumn(name = "categories_id") }
    )
    Set<CategoriesModel> categories = new HashSet<>();

    @OneToMany(mappedBy="movies")
    private Set<ReviewsModel> reviews = new HashSet<>();

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
