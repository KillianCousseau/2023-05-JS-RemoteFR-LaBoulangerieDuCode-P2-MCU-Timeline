import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import img from "../assets/Logo.svg";

function Navbar({ movieList }) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }
  return (
    <div className="navbar bg-black justify-between md:justify-between md:px-4 ">
      <div className="navbar-center flex items-center relative">
        <img src={img} alt="notre logo" className="xl:h-14" />
        <Link to="/" className="absolute w-full h-full" />
      </div>
      <div className="navbar-end md:hidden">
        <div className="dropdown dropdown-end md:hidden">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            htmlFor="search"
          >
            <svg
              id="search"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="dropdown-content z-50 ">
            <div className="dropdown-end ">
              <input
                tabIndex={0}
                type="text"
                value={value}
                placeholder="Type here"
                className=" menu menu-sm dropdown-end mt-3  shadow bg-black w-52 "
                onChange={handleChange}
              />
              <ul className="dropdown-end  ">
                {value &&
                  movieList.data
                    .filter((element) =>
                      element.title.toLowerCase().includes(value.toLowerCase())
                    )
                    .map(
                      (element, index) =>
                        index < 10 && (
                          <li
                            className=" dropdown-end bg-black bg-opacity-100  w-52"
                            key={element.id}
                          >
                            <a
                              href={`/detailed-page/${element.id}`}
                              className="w-full"
                            >
                              {element.title}
                            </a>
                          </li>
                        )
                    )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="dropdown dropdown-end md:hidden">
        <button
          type="button"
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          htmlFor="burger"
        >
          <svg
            id="burger"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <ul className="menu-sm dropdown-content mt-3 p-2 shadow bg-black w-52 z-50">
          <li>
            <a href="/profilepage" className="block">
              Profile
            </a>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex md:dropdown-content md:z-50">
        <div className="dropdown-end">
          <input
            tabIndex={0}
            value={value}
            type="text"
            placeholder="Search a movie"
            className="hidden md:block md:mr-6 lg:mr-12 md:input md:input-sm md:input-bordered md:input-primary md:w-52 md:max-w-xs md:dropdown-end menu menu-sm lg:h-10"
            onChange={handleChange}
          />
          <ul className="dropdown-end absolute">
            {value &&
              movieList.data
                .filter((element) =>
                  element.title.toLowerCase().includes(value.toLowerCase())
                )
                .map(
                  (element, i) =>
                    i < 10 && (
                      <li
                        className=" dropdown-end bg-black bg-opacity-100  w-52 lg:p-2 border-x border-primary last:border-b"
                        key={element.id}
                      >
                        <a
                          href={`/detailed-page/${element.id}`}
                          className="block lg:text-center lg:text-lg"
                        >
                          {element.title}
                        </a>
                      </li>
                    )
                )}
          </ul>
        </div>
        <ul className="hidden md:flex lg:w-56">
          <li className="text-white rounded-lg lg:px-4 lg:hover:bg-primary py-2">
            <Link to="/characters" className="lg:text-2xl md:mx-2">
              Rumble
            </Link>
          </li>
          <li className="text-white rounded-lg lg:px-4 lg:hover:bg-primary py-2">
            <Link to="/profilepage" className="lg:text-2xl md:mx-2 lg:mx-0">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

Navbar.propTypes = {
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

Navbar.defaultProps = {
  movieList: "movieList",
};

export default Navbar;
