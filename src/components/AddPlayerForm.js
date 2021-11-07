import React, { useState } from "react";

const AddPlayerForm = (props) => {
  const defaultValues = { id: null, name: "", number: "", team: "" };

  const [player, setPlayer] = useState(defaultValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPlayer({ ...player, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!player.name || !player.number || !player.team) return;

        props.addPlayer(player);
        setPlayer(defaultValues);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={player.name}
        onChange={handleInputChange}
      />
      <label>Number</label>
      <input
        type="text"
        name="number"
        value={player.number}
        onChange={handleInputChange}
      />
      <label>Team</label>
      <input
        type="text"
        name="team"
        value={player.team}
        onChange={handleInputChange}
      />
      <button>Add new player</button>
    </form>
  );
};

export default AddPlayerForm;
