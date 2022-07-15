import React from "react";
import MovieItem from "./MovieItem";
import "./MovieList.css";
import "../media.css";

// const API_IMG = "https://image.tmdb.org/t/p/w500";
function FavouriteList(props) {
  const { favMovies } = props;
  const moviesList = favMovies.map((movie, index) => {
    return (
      <div key={index}>
        <MovieItem
          id={movie.id}
          image={movie.poster_path}
          title={movie.title}
          releaseDate={movie.release_date}
        />
        <button className="favBtn" onClick={() => props.deleteItem(movie.id)}>
          Remove
        </button>
      </div>
    );
  });

  return <div className="list">{moviesList}</div>;
}

export default FavouriteList;
