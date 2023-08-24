import banner from "../assets/pxfuel (2).jpg";

function Profilepage() {
  const store = JSON.parse(localStorage.getItem("cardState"));

  const data = [];
  for (const key in store) {
    if (key) {
      data.push({ ...store[key], id: key });
    }
  }
  const movieSeen = data.filter((elem) => elem.isSeen);
  const moviesReleased = data.filter((elem) => elem.duration !== 0);
  const movieRemaining = moviesReleased.length - movieSeen.length;
  const minSeen = movieSeen.reduce((total, elem) => total + elem.duration, 0);
  const allMin = data.reduce((total, elem) => total + elem.duration, 0);
  const achievement = ((minSeen / allMin) * 100).toFixed();

  return (
    <>
      <div className=" mb-5 flex justify-center items-center h-20 md:h-36 lg:h-48  ">
        <img src={banner} alt="imga" className="h-full w-full" />
        <h1 className="text-3xl md:text-7xl  text-white absolute drop-shadow-md">
          {localStorage.getItem("hero")}
        </h1>
      </div>
      <div className=" flex flex-col  items-center justify-center">
        <div className="stats shadow  rounded-lg w-11/12 md:h-36">
          <div className="stat place-items-center">
            <div className="stat-title md:text-xl lg:text-3xl">Movie seen</div>
            <div className="stat-value text-red-600">{movieSeen.length}</div>
          </div>

          <div className="stat place-items-center ">
            <div className="stat-title md:text-xl lg:text-3xl">Minute seen</div>
            <div className="stat-value text-red-600 text-x">{minSeen}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title md:text-xl lg:text-3xl">Achievement</div>
            <div
              className="radial-progress text-red-600 lg:text-2xl "
              style={{
                "--value": Number.isNaN(achievement) ? 0 : achievement,
                "--size": "4rem",
                "--thickness": "0.5rem",
              }}
            >
              {Number.isNaN(achievement) ? 0 : achievement}%
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title md:text-xl lg:text-3xl">
              Remaining Films
            </div>
            <div className="stat-value text-red-600">{movieRemaining}</div>
          </div>
        </div>
        <div className="w-11/12 flex mt-5 mx-1 bg-black rounded-lg ">
          <table className="table ">
            <thead>
              <tr>
                <th colSpan={3} className="text-center md:text-xl lg:text-3xl">
                  Your top 5
                </th>
              </tr>
            </thead>
            <tbody>
              {movieSeen
                .sort((a, b) => b.isRating - a.isRating)
                .map(
                  (elem, index) =>
                    index < 5 && (
                      <tr key={elem.id}>
                        <td className=" md:w-32 ">
                          <div className="md:text-xl lg:text-3xl">
                            {index + 1}
                          </div>
                        </td>
                        <td>
                          <div className="md:text-xl lg:text-3xl ">
                            {elem.title}
                          </div>
                        </td>
                        <td>
                          <div className=" rating rating-sm md:rating-lg rating-half   flex justify-center mr-5  ">
                            {Array.from({ length: 11 }, (_, i) => (
                              <input
                                key={`${elem.id}-${i}`}
                                type="radio"
                                value={elem.isRating}
                                className={`${
                                  i % 2 === 0
                                    ? "mask mask-star-2 mask-half-2 bg-red-600"
                                    : "mask mask-star-2 mask-half-1 bg-red-600"
                                }  ${i === 0 && "rating-hidden"}`}
                                checked={elem.isRating === i}
                                readOnly
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
        <div className="w-11/12  mb-5 md:flex md:gap-2  lg:h-82">
          <div className="stats shadow rounded-lg mt-5 w-full ">
            <div className="stat">
              <div className="stat-title text-center md:text-xl  lg:text-3xl">
                Your worst film
              </div>
              {movieSeen
                .sort((a, b) => a.isRating - b.isRating)
                .map(
                  (elem, index) =>
                    index === 0 && (
                      <div key={elem.id} className="flex flex-col gap-3 ">
                        <div className="stat-value text-xl whitespace-normal text-center lg:text-3xl ">
                          {elem.title}
                        </div>
                        <div className=" rating rating-lg rating-half    justify-center mr-5  ">
                          {Array.from({ length: 11 }, (_, j) => (
                            <input
                              key={j}
                              type="radio"
                              value={elem.isRating}
                              className={`${
                                j % 2 === 0
                                  ? "mask mask-star-2 mask-half-2 bg-red-600"
                                  : "mask mask-star-2 mask-half-1 bg-red-600"
                              }  ${j === 0 && "rating-hidden"}`}
                              checked={elem.isRating === j}
                              readOnly
                            />
                          ))}
                        </div>
                      </div>
                    )
                )}
            </div>
          </div>
          <div className="w-full h-56 flex mt-5 mx-1 bg-black rounded-lg overflow-y-auto  lg:h-72 ">
            <table className="table table-pin-rows ">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="text-center md:text-xl lg:text-3xl"
                  >
                    Watchlist
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {moviesReleased
                  .filter((elem) => elem.isAdd && !elem.isSeen)
                  .sort((a, b) => a.chronology - b.chronology)
                  .map(
                    (elem, index) =>
                      elem.isAdd && (
                        <tr key={elem.id}>
                          <th className="md:w-32 md:text-xl lg:text-2xl">
                            {index + 1}
                          </th>
                          <td className="md:text-xl lg:text-2xl ">
                            {elem.title}
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profilepage;
