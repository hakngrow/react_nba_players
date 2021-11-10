## NBA Players CRUD App with React hooks and components
### Features
1. Add a player
2. Delete a player
3. Edit player details
4. Display a list of available players

### Wireframing the app UI
![Wireframing the UI](/public/images/wireframe.jpg)

The CRUD app will have 2 left/right sections. The left side will be a data entry form for adding and updating player details.  The right side will be a listing of available players.  Each row of the players table will have action buttons to edit or delete the player.  We can define this in `App.js` as below.
```
      <div className="flex-row">
        // Left side - Data entry form
        <div className="flex-large">
          <h2>Add Player</h2>
        </div>
        // Right side - List of players
        <div className="flex-large">
          <h2>View Players</h2>
        </div>
      </div>
```

### Players Table component
We define the `PlayersTable.js` component in the `src\components` directory.  It accepts 3 properties from the `App.js` parent, a list of players and the callback functions for the edit and delete buttons.  Before rendering, we check and display the table only if there are players in the list.
```
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
```

In this exercise, we can create and use a random data set locally.  In a subsequent MERN stack exercise, we will attempt to interact with a cloud based Mongo Atlas database.
We declare a random data store and assign it to a state variable `players`.

```
  const playersData = [
    { id: 1, name: "Stephen Curry", number: "30", team: "Golden State Warriors" },
    { id: 2, name: "Lebron James", number: "6", team: "L.A. Lakers" },
    { id: 3, name: "Jimmy Bulter", number: "22", team: "Miami Heat" },
  ];
  
  const [players, setPlayers] = useState(playersData);
```

With both the data and component defined, we can use the `PlayerTable` component in `App.js` by  importing it, and passing to it the `players` state variable.  The `editPlayer` and `deletePlayer` callback functions does nothing now, we will get to them later.

```
import PlayersTable from "./components/PlayersTable";
...
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2>Add Player</h2>
          </div>
        </div>
        <div className="flex-large">
          <h2>View Players</h2>
          <PlayersTable
            players={players}
            editPlayer={}
            deletePlayer={}
          />
        </div>
      </div>
```

With the basic UI setup done, we can proceed to add other functions to the app.

![Basic UI of app](/public/images/players_table.jpg)

### Adding a new player

We define the data entry form for adding a new player in `src\components\AddPlayerForm.js`.  The form consist of text input fields for the player's name, jersey number and team name, and a submit button as below. 

```
const AddPlayerForm = (props) => {

  return (
    <form>
      <label>Name</label>
      <input type="text" name="name"/>
      <label>Number</label>
      <input type="text" name="number"/>
      <label>Team</label>
      <input type="text" name="team"/>
      <button>Add new player</button>
    </form>
  );
};
```
![Basic add player form](/public/images/add_player.jpg)



