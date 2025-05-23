import { useState } from "react";
import "./App.css";
import type { FighterType } from "./constants";
import { zombieFighters } from "./constants";

// src/App.jsx

// Reactville is on high alert! As bizarre rumors turn into chilling reality,
// the city council has called for immediate action to safeguard the town and
// its inhabitants - against a looming zombie apocalypse!
// Your mission is to strategically assemble a survival team, handpicking
// members from the city’s diverse population, each bringing their unique
// skills and quirks. As the city’s newly appointed Survival Strategist,
// you will manage your team’s skills, resources, and stats.

const App = () => {
  // initilise states
  const [money, setMoney] = useState<number>(100);
  const [team, setTeam] = useState<FighterType[]>([]);
  const [zombieFightersSelection, setZombieFightersSelection] =
    useState<FighterType[]>(zombieFighters);

  // LEARNING (before i included remove button), i could do the below, but && is cleaner if i dont have an else
  // {addButtonRequired ? (
  //   <button onClick={() => handleAddFighter(fighter)}>Add</button>
  // ) : (
  //   <></>
  // )}
  const createListItem = (fighter: FighterType, addButtonRequired: boolean) => {
    return (
      <li key={fighter.id}>
        <img src={fighter.img} />
        <h3>{fighter.name}</h3>
        <p>Price: {fighter.price}</p>
        <p>Strength: {fighter.strength}</p>
        <p>Agiility: {fighter.agility}</p>
        {addButtonRequired ? (
          <button onClick={() => handleAddFighter(fighter)}>Add</button>
        ) : (
          <button onClick={() => handleRemoveFighter(fighter)}>Remove</button>
        )}
      </li>
    );
  };

  // because if-else cannot be placed inside {} as it wld be interpreted as an object literal
  // to avoid ternary operator, use IIFE, ok but online is still ternary lol
  const teamSection = (() => {
    if (team.length !== 0) {
      return <ul>{team.map((fighter) => createListItem(fighter, false))}</ul>;
    } else {
      return <p>Pick Some Team Members</p>;
    }
  })();

  const zombieFightersSelectionSection = (
    <ul>
      {zombieFightersSelection.map((zombieFighter) =>
        createListItem(zombieFighter, true)
      )}
    </ul>
  );

  const totalStrength = team
    .map((fighters) => fighters.strength)
    .reduce((previous, current) => previous + current, 0);

  const totalAgility = team
    .map((fighters) => fighters.agility)
    .reduce((previous, current) => previous + current, 0);

  // question is why cant i do that with Money? Money-totalCost? :O

  const handleAddFighter = (zombieFighter: FighterType) => {
    if (money - zombieFighter.price <= 0) {
      console.log("Not enough money");
      return;
    }
    // --- add selected fighter to team
    setTeam([...team, zombieFighter]);

    // --- remove fighter from zombieFightersSelection via id
    const newSelection = zombieFightersSelection.filter(
      (fighter) => fighter !== zombieFighter
    );
    setZombieFightersSelection(newSelection);

    // --- money -= fighter.price
    setMoney(money - zombieFighter.price);
  };

  const handleRemoveFighter = (zombieFighter: FighterType) => {
    // --- remove fighter from team
    const newTeam = team.filter((fighter) => fighter !== zombieFighter);
    setTeam(newTeam);

    // --- add selected fighter to selection (made it to go back in correct order)
    const newSelection = [...zombieFightersSelection, zombieFighter];
    const sortedNewSelection = newSelection.sort((a, b) => a.id - b.id); //just be careful because sort modifies original array
    setZombieFightersSelection(sortedNewSelection);

    // --- redun: money += fighter.price
    setMoney(money + zombieFighter.price);
  };

  return (
    <>
      <h1>Zombie Fighters</h1>
      <h2>Money: {money}</h2>
      <h2>Team Strength: {totalStrength} </h2>
      <h2>Team Agility: {totalAgility}</h2>
      <h2>Team: </h2>
      {teamSection}

      <h2>Fighters:</h2>
      {zombieFightersSelectionSection}
    </>
  );
};

export default App;
