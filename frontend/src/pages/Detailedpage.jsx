import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Rating from "../components/Rating";
import Countdown from "../components/CountdownTimer/Countdown";
import Accordion from "../components/Accordion";

function Detailedpage() {
  const [movie, setMovie] = useState(null);
  const dateNow = new Date();
  const [seen, setSeen] = useState(null);
  const [rating, setRating] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();
  function convertURL(url) {
    if (url.includes("youtu.be")) {
      const newUrl = url.replace("youtu.be", "youtube.com/embed");
      return newUrl;
    }
    return url;
  }
  useEffect(() => {
    const cardState = JSON.parse(localStorage.getItem("cardState"));
    if (cardState[id]) {
      const { isRating, isSeen } = cardState[id];
      setRating(isRating);
      setSeen(isSeen);
    } else {
      navigate("/no-match");
    }
  }, []);

  useEffect(() => {
    fetch("https://mcuapi.herokuapp.com/api/v1/movies")
      .then((res) => res.json())
      .then((data) => {
        const productData = data.data.find(
          (item) => item.id === parseInt(id, 10)
        );

        if (productData) {
          if (productData.trailer_url !== null) {
            productData.trailer_url = convertURL(productData.trailer_url);
            setMovie(productData);
          } else {
            setMovie(productData);
          }
        } else {
          navigate("/no-match");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {movie && (
        <div>
          {movie.release_date < dateNow.toISOString().split("T")[0] ? (
            <div className="flex flex-col	justify-between	2xl:mx-16 items-center mb-8 lg:mb-0">
              <div className="lg:flex lg:flex-row lg:justify-between 2xl:justify-center lg:w-full">
                <div className="hidden lg:flex lg:w-2/5 lg:m-8">
                  <img
                    src={movie.cover_url}
                    alt={movie.title}
                    title={movie.title}
                  />
                </div>
                <div className="lg:w-2/4 flex flex-col justify-center">
                  <div className="flex justify-center items-center ">
                    <img
                      src={movie.cover_url}
                      alt={movie.title}
                      className="w-3/4 mt-10 mb-6 lg:hidden rounded-lg"
                    />
                  </div>
                  <div>
                    <h1 className="text-white text-center mx-2 text-4xl my-8 lg:mr-12 lg:text-5xl lg:my-12">
                      {movie.title}
                    </h1>
                  </div>
                  <div className="mt-8 align-center justify-center flex">
                    <iframe
                      title={movie.title}
                      src={movie.trailer_url}
                      allowFullScreen
                      className=" md:h-96 w-11/12 h-56 2xl:h-[35rem] 2xl:w-[65rem]"
                    />
                  </div>
                  <div>
                    <div className="text-center m-8">
                      <p className="font-bold text-3xl mb-4">Synopsis :</p>
                      <p className="md:text-2xl">{movie.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  seen
                    ? "w-full lg:w-10/12 lg:flex lg:flex-row lg:justify-between lg:items-center lg:my-12"
                    : "w-full lg:w-10/12 lg:flex lg:flex-row lg:justify-around lg:items-center lg:my-12"
                }
              >
                <div>
                  <Rating movie={movie} />
                </div>
                <div className="my-12 mx-8 lg:w-1/3 lg:m-0">
                  <Accordion movie={movie} />
                </div>

                <div className={seen ? "flex flex-col items-center" : "hidden"}>
                  <h2 className="text-center font-bold text-2xl	mb-4 lg:text-4xl	">
                    Personal note
                  </h2>
                  <div
                    className="radial-progress text-3xl text-red-600 "
                    style={{
                      "--value": rating * 10,
                      "--size": "8rem",
                      "--thickness": "8px",
                    }}
                  >
                    {rating}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {movie.overview !== null ? (
                <>
                  <div className="lg:flex lg:flex-row lg:justify-around my-8">
                    <div className="hidden lg:flex lg:w-2/5">
                      <img
                        src={movie.cover_url}
                        alt={movie.title}
                        title={movie.title}
                      />
                    </div>

                    <div className="flex flex-col justify-center lg:w-2/5">
                      <div className="flex justify-center items-center ">
                        <img
                          src={movie.cover_url}
                          alt={movie.title}
                          className="w-3/4 mt-2 mb-6 lg:hidden rounded-lg"
                        />
                      </div>
                      <div>
                        <h1 className="text-white text-center mx-2 text-4xl my-4 lg:mr-12 lg:text-5xl lg:my-12">
                          {movie.title}
                        </h1>
                      </div>
                      <div className="mt-8 align-center justify-center flex">
                        <iframe
                          title={movie.title}
                          src={movie.trailer_url}
                          allowFullScreen
                          className="md:w-10/12 lg:w-full md:h-96"
                        />
                      </div>

                      <div className="text-center m-8">
                        <p className="font-bold text-3xl mb-4">Synopsis :</p>
                        <p className=" lg:text-2xl">{movie.overview}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mx-6 mb-8 flex items-center justify-center flex-col lg:flex-row lg:justify-around">
                    <div className="w-full my-8 lg:w-1/3">
                      <Accordion movie={movie} />
                    </div>
                    <div>
                      <Countdown countdownTimestampMs={movie.release_date} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="lg:flex lg:flex-row lg:justify-around my-8">
                  <div className="hidden lg:flex lg:w-2/5">
                    <img
                      src={movie.cover_url}
                      alt={movie.title}
                      title={movie.title}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col items-center lg:w-2/5">
                    <img
                      src={movie.cover_url}
                      alt={movie.title}
                      className="m-8 w-4/5 rounded-lg lg:hidden"
                    />
                    <div className="m-8 w-4/5">
                      <h1 className="text-white text-center my-12 text-4xl md:text-5xl">
                        {movie.title}
                      </h1>
                      <Accordion movie={movie} />
                    </div>

                    <div className="w-full my-12">
                      <Countdown countdownTimestampMs={movie.release_date} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Detailedpage;
