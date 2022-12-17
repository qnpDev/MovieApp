import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import MovieList from '../../components/MovieList/MovieList'
export default function Series() {
  const [series, setSeries] = useState([])
  const state = useSelector(state => state)
  useEffect(()=> {
    let dbSeries = [...state?.list?.lists]
    if(dbSeries.length > 0) {
      let newSeries = []
      dbSeries.forEach(serie => {
        let sr = {}
        sr.id = serie.id
        sr.title = serie.title
        sr.categories = serie.categories
        let mv = []
        state.movie.movies.forEach(movie => {
          if(movie.series.id === serie.id) {
            mv.push(movie)
          }
        })
        sr.movies = mv
        newSeries.push(sr)
      })
      setSeries(newSeries)
    }
  }, [state])
  
  return (
    <div className="homeUser">
      <Header></Header>
      <div className="containerUser">
        <section className="top-rated">
          <div className="containerMovieList">
            {series.length > 0 && series.map(serie => 
              <div className="series__item" key={serie.id}>
                <h3>{serie.title}</h3>
                <MovieList movies={serie.movies}></MovieList>
              </div>
            )}
            
          </div>
        </section>
      </div>
    </div>
  )
}
