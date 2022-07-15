import React from "react";
import MovieItem from "./MovieItem";
import "./MovieList.css";
import "../media.css";

// const API_IMG = "https://image.tmdb.org/t/p/w500";

function MovieList(props) {
  const { movies } = props;
  const moviesList = movies.map((movie, index) => {
    return (
      <div key={index}>
        <MovieItem
          id={movie.id}
          image={movie.poster_path}
          title={movie.title}
          releaseDate={movie.release_date}
        />
        <button className="favBtn" onClick={() => props.addItem(movie.id)}>
          Add to Favourites
        </button>
      </div>
    );
  });

  return <div className="list">{moviesList}</div>;
}

export default MovieList;
