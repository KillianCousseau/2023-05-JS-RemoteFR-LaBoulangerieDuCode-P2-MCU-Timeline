import PropTypes from "prop-types";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { useState } from "react";

import Card from "../components/Card";
import Phase from "../components/Phase";

function Home({ movieList }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {!toggle ? (
        <>
          <div className="flex justify-center md:justify-start md:ml-3 my-3 2xl:absolute 2xl:left-2.5 ">
            <div>
              <label className="cursor-pointer label w-72 ">
                <div className="badge badge-primary badge-lg w-1/3 h-full ">
                  Chrono
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-secondary toggle-lg "
                  checked={toggle}
                  onChange={() => setToggle(!toggle)}
                />
                <div className="w-1/3" />
              </label>
            </div>
          </div>

          <div>
            <VerticalTimeline>
              {movieList.data
                .sort((a, b) => a.chronology - b.chronology)
                .map((element) => (
                  <VerticalTimelineElement
                    key={element.id}
                    className="vertical-timeline-element--work"
                    contentStyle={{
                      background: "none",
                      color: "#fff",
                      boxShadow: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    contentArrowStyle={{ borderRight: "none" }}
                    iconStyle={{ background: "hsl(var(--p))", color: "#fff" }}
                  >
                    <Card movie={element} id={element.id} />
                    <div>
                      <p className="text-center">{element.saga}</p>
                      <p className="text-center">Phase {element.phase} </p>
                    </div>
                  </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center md:justify-end md:mr-3 my-3 2xl:absolute 2xl:right-5">
            <label className="cursor-pointer label w-72 ">
              <div className="w-1/3" />
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-lg  "
                checked={toggle}
                onChange={() => setToggle(!toggle)}
              />
              <div className="badge badge-primary badge-lg w-1/3 h-full ">
                Release
              </div>
            </label>
          </div>
          <Phase movieList={movieList} />
        </>
      )}
    </div>
  );
}
Home.propTypes = {
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

Home.defaultProps = {
  movieList: "movieList",
};

export default Home;
