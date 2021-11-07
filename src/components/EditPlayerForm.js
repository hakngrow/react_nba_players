import React, { useState, useEffect } from "react";

const EditPlayerForm = (props) => {
  const [player, setPlayer] = useState(props.currentPlayer);

  useEffect(() => {
    setPlayer(props.currentPlayer);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPlayer({ ...player, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        props.updatePlayer(player.id, player);
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
      <button>Update player</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditPlayerForm;
