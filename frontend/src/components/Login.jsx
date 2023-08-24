import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Login({ setLogin }) {
  const [hero, setHero] = useState("");
  const handleHero = () => {
    localStorage.setItem("hero", hero);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      localStorage.setItem("hero", hero);
      setLogin(false);
    }
  };
  return (
    <div className="hero w-full h-screen bg-black absolute z-10">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-primary">
            Welcome to MCU Timeline !
          </h1>
          <p className="py-6 mx-5 my-5">
            You'll be able to see all the MCU's movies timelines ordered either
            by chronology or by release date and much more ! <br />
            Add all your favorite movies to your watchlist and rank them when
            you've seen them ! <br />
          </p>
          <label htmlFor="hero" className="font-bold text-xl">
            Choose your hero name !
          </label>
          <div className="flex justify-center gap-2 mt-5">
            <input
              name="hero"
              type="text"
              value={hero}
              onChange={(e) => setHero(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type here"
              className="input input-bordered input-primary w-3/5 max-w-xs"
            />
            <button
              className="btn btn-primary w-1/3"
              type="button"
              onClick={handleHero}
            >
              <Link to="/" onClick={() => setLogin(false)}>
                {" "}
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setLogin: PropTypes.func.isRequired,
};

export default Login;
