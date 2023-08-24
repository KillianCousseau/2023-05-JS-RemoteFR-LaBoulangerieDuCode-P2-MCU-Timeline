import { useState } from "react";

import PropTypes from "prop-types";

function Characters({ comics, lock1, setFighter1, lock2, setFighter2 }) {
  const [flipped, setIsFlipped] = useState(false);
  const handleflip = () => {
    setIsFlipped(!flipped);
  };
  const handleSelect = () => {
    if (!lock1) {
      setFighter1(comics);
    }
    if (!lock2) {
      setFighter2(comics);
    }
  };

  return (
    <div className="flex-col">
      <div className="h-52 w-40 mx-3 mt-3">
        {!flipped ? (
          <div className="h-full w-full">
            <button
              type="button"
              className="h-full w-full"
              onClick={handleflip}
            >
              <img
                src={comics.images.sm}
                alt={comics.id}
                className="h-full w-full rounded-md"
              />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="h-full w-full rounded-md bg-slate-950 px-1"
            onClick={handleflip}
          >
            <h1 className="flex justify-center pb-2 text-slate-300 text-xl">
              Stats
            </h1>
            <div className="flex flex-col ml-1 mr-1 text-slate-300">
              <div className="flex items-center justify-between ">
                <div>
                  <p>Brain</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2">{comics.powerstats.intelligence}</p>
                  <progress
                    className="progress progress-primary bg-slate-700 w-12"
                    value={comics.powerstats.intelligence}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Force</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2">{comics.powerstats.strength}</p>
                  <progress
                    className="progress progress-primary bg-slate-700 w-12 "
                    value={comics.powerstats.strength}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                  <p>Speed</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2">{comics.powerstats.speed}</p>
                  <progress
                    className="progress progress-primary bg-slate-700 w-12 "
                    value={comics.powerstats.speed}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                  <p>Defense</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2">{comics.powerstats.durability}</p>
                  <progress
                    className="progress progress-primary bg-slate-700 w-12 "
                    value={comics.powerstats.durability}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                  <p>Power</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2">{comics.powerstats.power}</p>
                  <progress
                    className="progress progress-primary bg-slate-700 w-12"
                    value={comics.powerstats.power}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                  <p>Fight</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2">{comics.powerstats.combat}</p>
                  <progress
                    className="progress progress-primary bg-slate-700 w-12"
                    value={comics.powerstats.combat}
                    max="100"
                  />
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
      <p className="text-center text-slate-300">{comics.name}</p>
      <div className="flex justify-center">
        <button
          type="button"
          className="btn btn-info mt-2"
          onClick={handleSelect}
        >
          select
        </button>
      </div>
    </div>
  );
}
Characters.propTypes = {
  comics: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    slug: PropTypes.string,
    powerstats: PropTypes.shape({
      intelligence: PropTypes.number,
      strength: PropTypes.number,
      speed: PropTypes.number,
      durability: PropTypes.number,
      power: PropTypes.number,
      combat: PropTypes.number,
    }),
    appearance: PropTypes.shape({
      gender: PropTypes.string,
      race: PropTypes.string,
      height: PropTypes.arrayOf(PropTypes.string, PropTypes.string),
      weight: PropTypes.arrayOf(PropTypes.string, PropTypes.string),
      eyeColor: PropTypes.string,
      hairColor: PropTypes.string,
    }),
    biography: PropTypes.shape({
      fullName: PropTypes.string,
      alterEgos: PropTypes.string,
      aliases: PropTypes.arrayOf(PropTypes.string),
      placeOfBirth: PropTypes.string,
      firstAppearance: PropTypes.string,
      publisher: PropTypes.string,
      alignment: PropTypes.string,
    }),
    work: PropTypes.shape({
      occupation: PropTypes.string,
      base: PropTypes.string,
    }),
    connections: PropTypes.shape({
      groupAffiliation: PropTypes.string,
      relatives: PropTypes.string,
    }),
    images: PropTypes.shape({
      xs: PropTypes.string,
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string,
    }),
  }),
  lock1: PropTypes.bool,
  setFighter1: PropTypes.func,
  lock2: PropTypes.bool,
  setFighter2: PropTypes.func,
};

Characters.defaultProps = {
  comics: "comics",
  lock1: "lock1",
  setFighter1: "setFighter1",
  lock2: "lock2",
  setFighter2: "setFighter2",
};

export default Characters;
