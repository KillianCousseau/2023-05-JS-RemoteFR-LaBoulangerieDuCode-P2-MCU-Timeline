import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";

import Detailedpage from "../pages/Detailedpage";
import Profilepage from "../pages/Profilepage";
import NoMatch from "../pages/NoMatch";
import Home from "../pages/Home";
import Super from "../pages/Super";

function AppRoutes({ movieList }) {
  return (
    <Routes>
      <Route path="/" element={<Home movieList={movieList} />} />
      <Route path="/detailed-page/:id" element={<Detailedpage />} />
      <Route path="/profilepage" element={<Profilepage />} />
      <Route path="/characters" element={<Super />} />
      <Route path="/no-match" element={<NoMatch />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

AppRoutes.propTypes = {
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

AppRoutes.defaultProps = {
  movieList: "movieList",
};
export default AppRoutes;
