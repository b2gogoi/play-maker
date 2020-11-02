# `play-maker`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## UX Library: Material UI
Material UI kit is being used for all UI components [material-ui](https://material-ui.com)

## System Design

A simple app without any routing with just 2 page level components.
A pre filled team is provided for convenience(can be commented for empty state)

### Teamlist
**PlayerList**:
This lists the team players with their playing positions

**AddPlayerForm**:
For adding new player with basic validations

*Form is generated using dynamic array of FIELD*

**Sample FIELD data**
```
[
    { 
        key: 'firstName', 
        type: 'text', 
        label: 'First Name', 
        validationCheck: [v.types.REQUIRED, v.types.NAME]}
    }
]
```
### Quarter
To create, display and edit player positions for the quarter with validation

### Chooser
A generic component with label and select dropdown with validation support using **FIELD** data and propvided options

`
<Chooser field={f} options={v.positions} update={updatePostions} data={player[f.key]}/>
`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Screenshots
![Teamlist](Teamlist.png?raw=true)
![Add Player](AddPlayer.png?raw=true)
![Quarter](Quarter.png?raw=true)

