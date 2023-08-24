import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import Login from "./components/Login";

import "./App.css";

function App() {
  const [movieList, setMovieList] = useState(null);
  const [login, setLogin] = useState(!localStorage.getItem("hero"));

  useEffect(() => {
    fetch("https://mcuapi.herokuapp.com/api/v1/movies")
      .then((res) => res.json())
      .then((data) => setMovieList(data));
  }, []);

  return (
    <div>
      {movieList && (
        <div className="flex flex-col min-h-screen">
          {login ? (
            <Login setLogin={setLogin} />
          ) : (
            <>
              <Navbar movieList={movieList} />
              <div className="flex-grow">
                <AppRoutes movieList={movieList} />
              </div>
              <Footer />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
