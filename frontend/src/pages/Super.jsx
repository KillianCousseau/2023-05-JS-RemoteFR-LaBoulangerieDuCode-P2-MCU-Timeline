import React, { useEffect, useState } from "react";
import Characters from "../components/Characters";
import Versus from "../components/CountdownTimer/Versus/Versus";

function Super() {
  const [hero, sethero] = useState(null);
  const [value, setValue] = useState("");
  const handleFighter = (event) => {
    setValue(event.target.value);
  };

  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);
  const [lock1, setLock1] = useState(false);
  const [lock2, setLock2] = useState(false);

  useEffect(() => {
    fetch("https://akabab.github.io/superhero-api/api/all.json")
      .then((res) => res.json())
      .then((data) => sethero(data));
  }, []);

  const [activeGender, setActiveGender] = useState([]);
  const [activeAlignment, setActiveAlignment] = useState([]);
  const handleActiveGender = (gender) => {
    if (activeGender.includes(gender)) {
      setActiveGender(activeGender.filter((elem) => elem !== gender));
    } else {
      setActiveGender([gender]);
    }
  };

  const handleActiveAlignment = (filter) => {
    if (activeAlignment.includes(filter)) {
      setActiveAlignment(activeAlignment.filter((elem) => elem !== filter));
    } else {
      setActiveAlignment([filter]);
    }
  };
  const comics = hero
    ? hero.filter(
        (element) =>
          element.images.sm !==
            "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/no-portrait.jpg" &&
          [
            "Marvel Comics",
            "Rune King Thor",
            "Binary",
            "Anti-Vision",
            "Goliath",
            "Giant-Man",
            "Toxin",
            "Iron Lad",
            "Evil Deadpool",
          ].includes(element.biography.publisher) &&
          !["Forge", "Franklin Storm"].includes(element.name)
      )
    : [];
  for (let i = 0; i < comics.length; i += 1) {
    comics[i].powerstats.life = 1000;
  }

  const genders = [...new Set(comics.map((elem) => elem.appearance.gender))];
  const alignment = [
    ...new Set(comics.map((elem) => elem.biography.alignment)),
  ].filter((elem) => elem !== "-");

  return (
    <div className="mb-8">
      <Versus
        fighter1={fighter1}
        fighter2={fighter2}
        lock1={lock1}
        setLock1={setLock1}
        lock2={lock2}
        setLock2={setLock2}
        setFighter1={setFighter1}
        setFighter2={setFighter2}
      />
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex flex-wrap justify-center gap-2 mx-auto w-4/5">
          {genders.map((gender) => (
            <button
              key={gender}
              type="button"
              className={`${
                activeGender.includes(gender) ? "bg-primary" : "bg-black"
              }  rounded-lg py-2 px-3`}
              onClick={() => handleActiveGender(gender)}
            >
              {gender === "-"
                ? "Unknown"
                : gender.charAt(0).toLocaleUpperCase() + gender.slice(1)}
            </button>
          ))}
          {alignment.map((elem) => (
            <button
              key={elem}
              type="button"
              className={`${
                activeAlignment.includes(elem) ? "bg-primary" : "bg-black"
              }  rounded-lg py-2 px-3`}
              onClick={() => handleActiveAlignment(elem)}
            >
              {elem.charAt(0).toLocaleUpperCase() + elem.slice(1)}
            </button>
          ))}
          <input
            tabIndex={0}
            value={value}
            type="text"
            placeholder="Search a fighter"
            className="block input border-black border-2 w-full max-w-xs dropdown-end"
            onChange={handleFighter}
          />
        </div>
        <div className="flex justify-center">
          <div className="flex  flex-wrap justify-center">
            {comics
              .filter((element) =>
                element.name.toLowerCase().includes(value.toLowerCase())
              )
              .filter(
                (character) =>
                  !activeGender.length ||
                  activeGender.some((elem) =>
                    character.appearance.gender.includes(elem)
                  )
              )
              .filter(
                (character) =>
                  !activeAlignment.length ||
                  activeAlignment.some((elem) =>
                    character.biography.alignment.includes(elem)
                  )
              )
              .map((elem) => (
                <div key={elem.id} className=" ">
                  <Characters
                    comics={elem}
                    setFighter1={setFighter1}
                    lock1={lock1}
                    setFighter2={setFighter2}
                    lock2={lock2}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Super;
