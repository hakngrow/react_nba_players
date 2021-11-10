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

![Basic add player form](/public/images/add_player.jpg)

We use a `player` state variable to store the values of the text input fields.  We will also use a `defaultValues` object to initialize the state of the form on first render and everytime after a submit. 

```
  const defaultValues = { id: null, name: "", number: "", team: "" };

  const [player, setPlayer] = useState(defaultValues);
```

We handle changes to all 3 text input fields using a common event handler function.  The function extracts the source and changed value, and updates the form state variable `player`.

```
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPlayer({ ...player, [name]: value });
  };
```

When a user clicks on the 'Add new player' button, we will:
1. Prevent the default form submission
2. Check for empty values
3. Add the new player to the player listing in `App.js` via the callback function passed in `props` 

```
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!player.name || !player.number || !player.team) return;

        props.addPlayer(player);
        setPlayer(defaultValues);
      }}
    >
```

### Deleting a player

Deleting a player is handled by the `deletePlayer` function.  The function 'filters' out the player to be deleted based on the `id` and updates the `players` state variable with the new list of players.

```
  const deletePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };
```

We pass the function through `props` to the `PlayerTable` component.

```
<PlayersTable players={players} deletePlayer={deletePlayer} />
```

When the 'Delete' button is clicked, the `onClick` event handler invokes the `deletePlayer` function via `props`.

```
              <button
                onClick={() => props.deletePlayer(player.id)}
                className="button muted-button"
              >
                Delete
              </button>
```

### Updating a player

Updating a player will be similar to adding a player, except we need to identify the player selected for editing.  We will structure the app such that when the 'Edit' button for a player is clicked, an edit player form will replace the add player form, with text input fields populated with the player's data.  The user can then choose to cancel the edit mode, or submit the changes, which will end the edit mode and update the players list in the `App` component.

In `App.js`, we need a state variable to keep track of whether the app is in edit mode.  The `editing` state variable defaults to `false`.

```
const [editing, setEditing] = useState(false);
```

In order to track the selected player for editing, we create another state variable `currentPlayer` and initialize it to some default values.

```
const defaultValues = { id: null, name: "", number: "", team: "" };

const [currentPlayer, setCurrentPlayer] = useState(defaultValues);
```

When the 'Edit' button of a player is clicked, we should turn on edit mode by setting the `editing` state variable to `true`, and store the selected player in `currentPlayer`.

```
  const editPlayer = (player) => {
    setEditing(true);

    setCurrentPlayer({
      id: player.id,
      name: player.name,
      number: player.number,
      team: player.team,
    });
  };
```

Like in deleting a player, we pass this function to the `PlayersTable` component via `props`.

```
          <PlayersTable
            players={players}
            editPlayer={editPlayer}
            deletePlayer={deletePlayer}
          />
```

In the `PlayersTable` component, we want to call this function via `props`, passing it the player selected for edit.

```
              <button
                onClick={() => {
                  props.editPlayer(player);
                }}
                className="button muted-button"
              >
                Edit
              </button>
```
