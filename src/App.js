import { React, useState } from "react";

import PlayersTable from "./components/PlayersTable";
import AddPlayerForm from "./components/AddPlayerForm";
import EditPlayerForm from "./components/EditPlayerForm";

const App = () => {
  const playersData = [
    {
      id: 1,
      name: "Stephen Curry",
      number: "30",
      team: "Golden State Warriors",
    },
    { id: 2, name: "Lebron James", number: "6", team: "L.A. Lakers" },
    { id: 3, name: "Jimmy Bulter", number: "22", team: "Miami Heat" },
  ];

  const defaultValues = { id: null, name: "", number: "", team: "" };

  const [players, setPlayers] = useState(playersData);
  const [editing, setEditing] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(defaultValues);

  const addPlayer = (player) => {
    player.id = players.length + 1;
    setPlayers([...players, player]);
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
    setEditing(false);
  };

  const updatePlayer = (id, updatedPlayer) => {
    setEditing(false);

    setPlayers(
      players.map((player) => (player.id === id ? updatedPlayer : player))
    );
  };

  const editPlayer = (player) => {
    setEditing(true);

    setCurrentPlayer({
      id: player.id,
      name: player.name,
      number: player.number,
      team: player.team,
    });
  };

  return (
    <div className="container">
      <h1>NBA Players - CRUD App with React Hooks and components</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit Player</h2>
              <EditPlayerForm
                setEditing={setEditing}
                currentPlayer={currentPlayer}
                updatePlayer={updatePlayer}
              />
            </div>
          ) : (
            <div>
              <h2>Add Player</h2>
              <AddPlayerForm addPlayer={addPlayer} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View Players</h2>
          <PlayersTable
            players={players}
            editPlayer={editPlayer}
            deletePlayer={deletePlayer}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
