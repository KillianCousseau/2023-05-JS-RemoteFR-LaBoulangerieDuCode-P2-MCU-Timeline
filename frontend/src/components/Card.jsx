import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Card({ movie, id }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isSeen, setisSeen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isWantToAdd, setIsWantToAdd] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isRating, setIsRating] = useState(0);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("cardState"));

    if (storedState && storedState[id]) {
      const {
        isSeen: storedIsSeen,
        isAdd: storedIsAdd,
        isRating: storedIsRating,
      } = storedState[id];

      setisSeen(storedIsSeen);
      setIsAdd(storedIsAdd);

      setIsRating(storedIsRating);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const storedState = JSON.parse(localStorage.getItem("cardState")) || [];
      const { duration, title, chronology } = movie;

      localStorage.setItem(
        "cardState",
        JSON.stringify({
          ...storedState,
          [id]: {
            title,
            duration,
            isSeen,
            isAdd,
            isRating,
            chronology,
          },
        })
      );
    }, 500);
  }, [isSeen, isAdd, isRating]);

  const handleRatingChange = (event) => {
    const selectedRating = parseInt(event.target.value, 10);
    setIsRating(selectedRating);
  };

  const handleAdd = () => {
    setIsAdd(!isAdd);
    setIsWantToAdd(!isWantToAdd);
    setTimeout(() => {
      setIsWantToAdd(false);
    }, 2000);
  };
  const handleRemove = () => {
    setIsAdd(!isAdd);
    setIsRemove(!isRemove);
    setTimeout(() => {
      setIsRemove(false);
    }, 2000);
  };
  const handleSeen = () => {
    setisSeen(!isSeen);
    setIsRating(0);
  };
  const handleChange = () => {
    setIsClicked(!isClicked);
  };

  const dateNow = new Date();

  return (
    <div className="w-44 h-64 md:h-80 md:w-60 shadow-custom  ">
      {isClicked ? (
        <div className="bg-slate-900 flex justify-center  items-center w-full h-full rounded-lg ">
          {movie.release_date > dateNow.toISOString().split("T")[0] ? (
            <div className="flex flex-col justify-between h-full w-full p-4">
              <div className="flex flex-col justify-between h-full">
                <h1 className="whitespace-normal text-center font-bold md:font-normal md:text-2xl">
                  {movie.title}
                </h1>
                <div className="mb-10 md:mb-16 flex flex-col gap-1 md:text-xl text-center">
                  <p>Release date :</p>
                  <p>{movie.release_date}</p>
                </div>
              </div>
              <div className="  flex justify-center gap-2">
                <button type="button" className="btn btn-info md:w-6/12">
                  <Link to={`/detailed-page/${movie.id}`}>Info</Link>
                </button>
                <button
                  type="button"
                  className="btn btn-neutral md:w-6/12"
                  onClick={handleChange}
                >
                  Return
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col  h-full w-full p-2 md:p-4">
              <div className="flex flex-col justify-between h-full mb-2">
                <div>
                  <h1 className=" whitespace-normal text-center md:text-2xl">
                    {movie.title}
                  </h1>
                </div>
                {!isSeen ? (
                  <div className="flex justify-center gap-2 mb-6 md:mb-14">
                    <button
                      type="button"
                      className="btn btn-success w-5/12 md:w-5/12"
                      onClick={handleSeen}
                    >
                      seen
                    </button>
                    {!isAdd ? (
                      <button
                        type="button"
                        className="btn btn-info w-5/12 md:w-5/12"
                        onClick={handleAdd}
                      >
                        add
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-error w-6/12 md:w-5/12"
                        onClick={handleRemove}
                      >
                        remove
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <p className="text-center">Your rating :</p>
                    <div className=" rating rating-lg  rating-half  mb-3 flex justify-center ">
                      {Array.from({ length: 11 }, (_, index) => (
                        <input
                          key={index}
                          type="radio"
                          value={index}
                          className={`
                            ${
                              index % 2 === 0
                                ? "mask mask-star-2 mask-half-2 bg-red-600"
                                : "mask mask-star-2 mask-half-1 bg-red-600"
                            }  ${index === 0 && "rating-hidden"}`}
                          checked={isRating === index}
                          onChange={handleRatingChange}
                          readOnly={index === 0}
                        />
                      ))}
                    </div>
                    <div className=" flex justify-center mt-1">
                      <button
                        type="button"
                        className="btn btn-error"
                        onClick={handleSeen}
                      >
                        Not seen Yet
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-2">
                <button type="button" className="btn btn-info md:w-6/12">
                  <Link to={`/detailed-page/${movie.id}`}>Info</Link>
                </button>
                <button
                  type="button"
                  className="btn btn-neutral md:w-6/12"
                  onClick={handleChange}
                >
                  Return
                </button>
              </div>
              {isWantToAdd && (
                <div className="h-8 flex items-center justify-center">
                  <div className="alert h-full alert-info relative flex mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current  w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className=" text-xs text-clip whitespace-normal">
                      Added to the watchlist
                    </span>
                  </div>
                </div>
              )}
              {isRemove && (
                <div className="h-8 flex items-center justify-center mt-2">
                  <div className="alert h-full alert-error flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current  w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-xs text-clip whitespace-normal">
                      Removed from the watchlist
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className=" h-full border-slate-500 border-2 zoom-hover">
          <button
            type="button"
            className="w-full h-full"
            onClick={handleChange}
          >
            <img
              src={movie.cover_url}
              alt={movie.title}
              className="w-full h-full"
            />
          </button>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
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
  id: PropTypes.number,
};

Card.defaultProps = {
  movie: "movie",
  id: "id",
};
export default Card;
