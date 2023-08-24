import PropTypes from "prop-types";

function Accordion({ movie }) {
  const accordionItem = (title, content) => {
    return (
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">{title}</div>
        <div className="collapse-content">
          {content === null || content === "" || content === 0 ? (
            <p>No info yet</p>
          ) : (
            <p>{content}</p>
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      {accordionItem("Release date :", movie.release_date)}
      {accordionItem("Directed by :", movie.directed_by)}
      {accordionItem("Phase :", movie.phase)}
      {accordionItem("Saga :", movie.saga)}
      {accordionItem("Chronology :", movie.chronology)}
      {accordionItem("Duration :", movie.duration)}
    </div>
  );
}

Accordion.propTypes = {
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

Accordion.defaultProps = {
  movie: "movie",
};

export default Accordion;
