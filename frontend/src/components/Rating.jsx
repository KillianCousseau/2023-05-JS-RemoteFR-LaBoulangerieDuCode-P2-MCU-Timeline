import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Rating({ movie }) {
  const [rating, setRating] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API}`,
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/find/${movie.imdb_id}?external_source=imdb_id`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const ratingData = data.movie_results[0];
        setRating(ratingData);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center font-bold text-2xl	mb-4 lg:text-4xl">
        Note IMDB
      </h2>
      {rating && (
        <div
          className="radial-progress text-3xl text-red-600"
          style={{
            "--value": rating.vote_average * 10,
            "--size": "8rem",
            "--thickness": "8px",
          }}
        >
          {rating.vote_average.toFixed(1)}
        </div>
      )}
    </div>
  );
}

Rating.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    release_date: PropTypes.string,
    box_office: PropTypes.string,
    duration: PropTypes.number,
    overview: PropTypes.string,
    cover_url: PropTypes.string,
    trailer_url: PropTypes.string,
    directed_by: PropTypes.string,
    phase: PropTypes.number,
    saga: PropTypes.string,
    chronology: PropTypes.number,
    post_credit_scenes: PropTypes.number,
    imdb_id: PropTypes.string,
  }),
};

Rating.defaultProps = {
  movie: "movie",
};

export default Rating;
