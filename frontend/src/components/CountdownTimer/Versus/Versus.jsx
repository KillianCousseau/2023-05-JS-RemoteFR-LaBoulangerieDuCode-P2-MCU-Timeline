import { useState } from "react";
import PropTypes from "prop-types";

function Versus({
  fighter1,
  fighter2,
  lock1,
  setLock1,
  lock2,
  setLock2,
  setFighter1,
  setFighter2,
}) {
  const [winner, setWinner] = useState(null);
  const [round, setRound] = useState(null);
  const [loser, setLoser] = useState(null);
  const getRandomInt = (max) => {
    return 1 + Math.floor(Math.random() * max);
  };
  const handleResult = () => {
    setLoser(null);
    setWinner(null);
    setFighter1(null);
    setFighter2(null);
    setRound(null);
    setLock1(!lock1);
    setLock2(!lock2);
  };

  const getAttack = (fighter) => {
    const attack =
      fighter.powerstats.strength +
      fighter.powerstats.power * 2 +
      fighter.powerstats.combat * 2 +
      fighter.powerstats.intelligence / 2 +
      fighter.powerstats.speed;
    return getRandomInt(attack);
  };

  const getDefense = (fighter) => {
    const defense =
      fighter.powerstats.durability +
      fighter.powerstats.power / 2 +
      fighter.powerstats.combat +
      fighter.powerstats.intelligence * 1.5 +
      fighter.powerstats.speed;
    return defense;
  };

  const fight = (character1, character2) => {
    const clone = character2;
    const damages = Math.max(getAttack(character1) - getDefense(clone), 0);
    clone.powerstats.life = Math.max(clone.powerstats.life - damages, 0);
  };

  const isAlive = (fighter) => {
    return fighter.powerstats.life > 0;
  };

  const score = (character1, character2) => {
    return isAlive(character1)
      ? { winner: character1, loser: character2 }
      : { winner: character2, loser: character1 };
  };

  const startDuel = (character1, character2) => {
    let counter = 0;
    while (isAlive(character1) && isAlive(character2)) {
      fight(character1, character2);
      if (isAlive(character2)) {
        fight(character2, character1);
      }
      counter += 1;
    }
    setRound(counter);
    const result = score(character1, character2);
    setLoser(result.loser);
    setWinner(result.winner);
  };
  return (
    <div className="mx-2">
      <div className="flex justify-center text-center mx-5 mt-10 text-4xl font-bold">
        <h1>
          Choose your favorite Marvel characters and let's get ready to
          RUUUUMBLE !!
        </h1>
      </div>
      <div className="w-full flex mt-10">
        <div className="flex flex-col w-1/4 items-center gap-2 md:w-1/5 ">
          <div>
            {fighter1 ? (
              <>
                <p className="text-center mb-2">{fighter1.name}</p>
                <img
                  className="rounded-md"
                  src={fighter1.images.sm}
                  alt={fighter1.name}
                />
              </>
            ) : (
              <img
                className="rounded-md"
                src="https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/no-portrait.jpg"
                alt="random"
              />
            )}
          </div>
          <div>
            <button
              type="button"
              className={`btn ${!lock1 ? "btn-success" : "btn-warning"}`}
              onClick={() => setLock1(!lock1)}
            >
              {!lock1 ? "Ready ?" : "Change"}
            </button>
          </div>
        </div>
        <div className="flex w-1/2   items-center md:w-3/5">
          {/* // */}
          {fighter1 && (
            <div className="w-1/6 md:p-1 md:w-2/6 lg:m-1 lg:text-xl">
              <div className="flex flex-col justify-start">
                <div className="flex items-center  justify-between  ">
                  <div>
                    <p>Brain</p>
                  </div>
                  <div className="flex items-center">
                    <p className="mx-2">{fighter1.powerstats.intelligence}</p>
                    <progress
                      className="progress progress-primary bg-slate-600 md:w-12 lg:w-24 lg:h-3"
                      value={fighter1.powerstats.intelligence}
                      max="100"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between ">
                  <div>
                    <p>Force</p>
                  </div>
                  <div className="flex items-center">
                    <p className="mx-2">{fighter1.powerstats.strength}</p>
                    <progress
                      className="progress progress-primary bg-slate-600 md:w-12 lg:w-24 lg:h-3 "
                      value={fighter1.powerstats.strength}
                      max="100"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between ">
                  <div>
                    <p>Speed</p>
                  </div>
                  <div className="flex items-center">
                    <p className="mx-2">{fighter1.powerstats.speed}</p>
                    <progress
                      className="progress progress-primary  bg-slate-600 md:w-12 lg:w-24 lg:h-3"
                      value={fighter1.powerstats.speed}
                      max="100"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between ">
                  <div>
                    <p>Defense</p>
                  </div>
                  <div className="flex items-center">
                    <p className="mx-2">{fighter1.powerstats.durability}</p>
                    <progress
                      className="progress progress-primary md:w-12  bg-slate-600 lg:w-24 lg:h-3"
                      value={fighter1.powerstats.durability}
                      max="100"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between ">
                  <div>
                    <p>Power</p>
                  </div>
                  <div className="flex items-center">
                    <p className="mx-2">{fighter1.powerstats.power}</p>
                    <progress
                      className="progress progress-primary md:w-12 bg-slate-600 lg:w-24 lg:h-3"
                      value={fighter1.powerstats.power}
                      max="100"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between ">
                  <div>
                    <p>Fight</p>
                  </div>
                  <div className="flex items-center">
                    <p className="mx-2">{fighter1.powerstats.combat}</p>
                    <progress
                      className="progress progress-primary  bg-slate-600 md:w-12 lg:w-24 lg:h-3"
                      value={fighter1.powerstats.combat}
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="w-4/6  h-64 flex flex-col items-center g md:2/6">
            <div className=" w-full h-full rounded  flex flex-col justify-center g">
              {winner && loser && (
                <div className="flex flex-col justify-center gap-3 items-center ">
                  <div className="text-center h-4/6 lg:text-2xl font-bold px-2">
                    <p>After {round} rounds, </p>
                    <p>{loser.name} has been defeated... 💀</p>
                    <p>{winner.name} has won ! 🏆</p>
                  </div>
                  <div className="h-2/6">
                    <button
                      type="button"
                      className="btn btn-info mt-4"
                      onClick={handleResult}
                    >
                      New rumble
                    </button>
                  </div>
                </div>
              )}
            </div>
            {lock1 && lock2 && fighter1 !== fighter2 && !winner && (
              <div className="">
                <button
                  type="button"
                  className=" btn btn-error"
                  onClick={() => {
                    startDuel(fighter1, fighter2);
                  }}
                >
                  Fight
                </button>
              </div>
            )}
          </div>
          {fighter2 && (
            <div className="w-1/6 md:w-2/6 m-1 lg:text-xl">
              <div className="flex items-center justify-between  ">
                <div>
                  <p>Brain</p>
                </div>
                <div className="flex items-center">
                  <p className="mx-2">{fighter2.powerstats.intelligence}</p>
                  <progress
                    className="progress progress-primary bg-slate-600 md:w-12 lg:w-24 lg:h-3"
                    value={fighter2.powerstats.intelligence}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                  <p>Force</p>
                </div>
                <div className="flex items-center">
                  <p className="mx-2">{fighter2.powerstats.strength}</p>
                  <progress
                    className="progress progress-primary md:w-12  bg-slate-600 lg:w-24 lg:h-3 "
                    value={fighter2.powerstats.strength}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                  <p>Speed</p>
                </div>
                <div className="flex items-center">
                  <p className="mx-2">{fighter2.powerstats.speed}</p>
                  <progress
                    className="progress progress-primary md:w-12  bg-slate-600 lg:w-24 lg:h-3"
                    value={fighter2.powerstats.speed}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                  <p>Defense</p>
                </div>
                <div className="flex items-center">
                  <p className="mx-2">{fighter2.powerstats.durability}</p>
                  <progress
                    className="progress progress-primary md:w-12 bg-slate-600 lg:w-24 lg:h-3 "
                    value={fighter2.powerstats.durability}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                  <p>Power</p>
                </div>
                <div className="flex items-center">
                  <p className="mx-2">{fighter2.powerstats.power}</p>
                  <progress
                    className="progress progress-primary md:w-12  bg-slate-600 lg:w-24 lg:h-3"
                    value={fighter2.powerstats.power}
                    max="100"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                  <p>Fight</p>
                </div>
                <div className="flex items-center">
                  <p className="mx-2">{fighter2.powerstats.combat}</p>
                  <progress
                    className="progress progress-primary md:w-12 lg:w-24 bg-slate-600 lg:h-3"
                    value={fighter2.powerstats.combat}
                    max="100"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* // */}
        <div className="flex flex-col w-1/4 items-center gap-2 md:w-1/5 ">
          <div>
            {fighter2 ? (
              <>
                <p className="text-center mb-2">{fighter2.name}</p>
                <img
                  className="rounded-md"
                  src={fighter2.images.sm}
                  alt={fighter2.name}
                />
              </>
            ) : (
              <img
                className="rounded-md"
                src="https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/no-portrait.jpg"
                alt="random"
              />
            )}
          </div>
          <div>
            <button
              type="button"
              className={`btn ${!lock2 ? "btn-success" : "btn-warning"}`}
              onClick={() => setLock2(!lock2)}
            >
              {!lock2 ? "Ready ?" : "Change"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Versus;

Versus.propTypes = {
  fighter1: PropTypes.shape({
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
  fighter2: PropTypes.shape({
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
  setLock1: PropTypes.func,
  setLock2: PropTypes.func,
  lock1: PropTypes.bool,
  setFighter1: PropTypes.func,
  lock2: PropTypes.bool,
  setFighter2: PropTypes.func,
};

Versus.defaultProps = {
  fighter1: "fighter1",
  fighter2: "fighter2",
  lock1: "lock1",
  setLock1: "setLock1",
  lock2: "lock2",
  setLock2: "setLock2",
  setFighter1: "setFighter1",
  setFighter2: "setFighter2",
};
