import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import * as v from '../../util/utils';

const fields = [
    {key: 'firstName', label: 'First Name', validationCheck: [v.types.REQUIRED, v.types.NAME]},
    {key: 'lastName', label: 'Last Name', validationCheck: [v.types.REQUIRED, v.types.NAME]},
    {key: 'height', label: 'Height (in cms)', validationCheck: [v.types.REQUIRED, v.types.NUM_ONLY, v.types.HEIGHT]}
];

const initialPlayerState = (() => fields.reduce((acc, f) => {
        return {...acc, [f.key]:{value: ''}}
    }, {}))();

function AddPlayerForm (props) {
    const [player, setPlayer] = useState(initialPlayerState);
    const [enableSave, setEnableSave] = useState(false);

    const updatePlayer = () => {
        const newPlayer =  Object.keys(player).reduce((acc, key)=>({...acc, [key]: player[key].value.trim()}), {});
        props.add(newPlayer);
    }

    const validate = (value, f) => {
        const error = v.check(value, f.label, f.validationCheck);
        const clone = {...player[f.key], value, error};    
        setPlayer({...player, [f.key]:clone});
        setEnableSave(!error);
    }

    return (
        <div className="addplayer-form">
            <form noValidate autoComplete="off">
                {fields.map(f => 
                    <div key={f.key}>
                        <TextField required label={f.label}
                            error={Boolean(player[f.key].error)}
                            helperText={player[f.key].error}
                            onFocus={(e) => setEnableSave(false)}
                            onBlur={(e) => validate(e.target.value, f)} />
                    </div>
                )}
            </form>
            <div className="action-row">
                <Button variant="contained" color="primary" onClick={updatePlayer} disabled={!enableSave}>
                    Save
                </Button>
            </div>
        </div> 
    )
}

function PlayerList (props) {
    return (
        <div className="players-list">
            {props.players.map((plyr, idx) => <div key={`${idx}-${plyr.firstName}`}>
                    {idx+1}. {plyr.firstName} {plyr.lastName} ({plyr.height} cms)
                </div>
            )}
        </div>
    )
}

export default function TeamList (props) {
    const [players, setPlayers] = useState(props.team);
    const [showAddPlayer, setShowAddPlayer] = useState(false);

    const add = (player) => {
        setPlayers([...players, player]);
        setShowAddPlayer(false);
        props.update([...players, player]);
    }

    return (
        <>
            <h2>Team List</h2>
            {!showAddPlayer && <Button variant="contained" color="primary" onClick={() => setShowAddPlayer(true)}>
                Add a player
            </Button>}
            {showAddPlayer && <AddPlayerForm add={add} />}

            {Boolean(players.length) && <PlayerList players={players} />}


           

        </>
    )
}
