import PropTypes from "prop-types";
import Card from "./Card";
import "../assets/Infinity Saga.jpg";
import "../assets/Multiverse Saga.jpg";

function Phase({ movieList }) {
  const phases = [...new Set(movieList.data.map((movie) => movie.phase))];

  const sagas = [...new Set(movieList.data.map((movie) => movie.saga))];

  return (
    <>
      {sagas.map((saga) => (
        <div key={saga}>
          <div className="flex justify-center rounded-sm">
            <h1 className="text-center text-2xl lg:text-5xl mt-8 bg-primary rounded-xl text-white p-4 w-2/3  ">
              {saga.toLocaleUpperCase()}
            </h1>
          </div>
          {phases.map(
            (phase) =>
              movieList.data.some(
                (element) => element.saga === saga && element.phase === phase
              ) && (
                <div key={phase}>
                  <h1 className=" text-white text-xl pl-2 pt-5 pb-4 bg-base lg:text-center">
                    Phase {phase}:
                  </h1>
                  <div
                    className="h-full w-full text-center  bg-black lg:w-9/12 m-auto last:mb-4 "
                    key={phase}
                  >
                    <div className="w-full whitespace-nowrap overflow-y-hidden overflow-x-auto  ">
                      {movieList.data
                        .sort((a, b) => a.id - b.id)
                        .map(
                          (element) =>
                            element.saga === saga &&
                            element.phase === phase && (
                              <div
                                className="  inline-block align-middle mt-2 my-2 ml-2.5 last:mr-2.5 lg:mx-3 lg:my-4"
                                key={element.id}
                              >
                                <Card movie={element} id={element.id} />
                              </div>
                            )
                        )}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      ))}
    </>
  );
}
Phase.propTypes = {
  movieList: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    ),
    total: PropTypes.number,
  }),
};

Phase.defaultProps = {
  movieList: "movieList",
};

export default Phase;
