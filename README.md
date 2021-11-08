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

```

```
