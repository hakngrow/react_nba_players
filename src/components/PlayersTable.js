import React from "react";

const PlayersTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Number</th>
        <th>Team</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.players.length > 0 ? (
        props.players.map((player) => (
          <tr key={player.id}>
            <td>{player.name}</td>
            <td>{player.number}</td>
            <td>{player.team}</td>
            <td>
              <button
                onClick={() => {
                  props.editPlayer(player);
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deletePlayer(player.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No players</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default PlayersTable;
