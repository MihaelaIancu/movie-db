import React from "react";
import "./MovieItem.css";
import "../media.css";

function MovieItem(props) {
  const { image, title, releaseDate } = props;
  // console.log(`${image}`);
  return (
    <div className="movieCard">
      <div className="imageWrapper">
        {image === null ? (
          <img
            loading="lazy"
            className="poster"
            title={title}
            src="https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
            alt={title}
          />
        ) : (
          <img
            loading="lazy"
            className="poster"
            title={title}
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt={title}
          />
        )}
      </div>
      <div className="content">
        <h2>{title}</h2>
        <p>{releaseDate}</p>
      </div>
    </div>
  );
}

export default MovieItem;
