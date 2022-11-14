package com.qnp.server.Models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
public class CategoriesModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "categories")
    private List<SeriesModel> series = new ArrayList<>();

    @ManyToMany(mappedBy = "categories")
    private List<MoviesModel> movies = new ArrayList<>();

    // fix infinite loop
    public SeriesModel getSeries() {
        return null;
    }

    public List<SeriesModel> seriesCustomGet(){
        return series;
    }

    public int getSeriesCount(){
        return series.size();
    }

    public MoviesModel getMovies() {
        return null;
    }

    public List<MoviesModel> moviesCustomGet() {
        return movies;
    }

    public int getMoviesCount() {
        return movies.size();
    }
    //end fix infinite loop

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
