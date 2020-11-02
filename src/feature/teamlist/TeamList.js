import React, { useState } from 'react';
import { Avatar, Button, Chip, TextField } from '@material-ui/core';
import Chooser from '../../components/Chooser';
import * as v from '../../util/utils';

const fields = [
    {key: 'firstName', type: 'text', label: 'First Name', validationCheck: [v.types.REQUIRED, v.types.NAME]},
    {key: 'lastName', type: 'text', label: 'Last Name', validationCheck: [v.types.REQUIRED, v.types.NAME]},
    {key: 'height', type: 'text', label: 'Height (in cms)', validationCheck: [v.types.REQUIRED, v.types.NUM_ONLY, v.types.HEIGHT]},
    {key: 'positions', type: 'chooser', label: 'Position', validationCheck: [v.types.REQUIRED]}
];

// Initializing from fields, sample below
/*
    {
        firstName: { value: ''},
        lastName: { value: ''},
        height: { value: ''},
        positions: { 
            value: {
                PG: false,
                SG: false,
                C: false,
                SF: false,
                PF: false

            }
        }
    }
*/
const initialPlayerState = ((pos) => {
    const init = fields.reduce((acc, f) => {
        let value = '';
        if (f.type === 'chooser') {
            value = pos.reduce((acc, p) => {return {...acc, [p.code]:false}}, {});
        }
        return {...acc, [f.key]:{value: value}}
    }, {});
    return init;
})(v.positions);

function AddPlayerForm (props) {
    const [player, setPlayer] = useState(initialPlayerState);
 
    const validate = (value, f) => {
        const error = v.check(value, f.label, f.validationCheck);
        const clone = {...player[f.key], value, error};    
        setPlayer({...player, [f.key]:clone});
    }

    const validateForm = () => {
        let clone = {...player};
        let ok = true;

        fields.forEach(f => {           
            const error = v.check({...player[f.key]}.value, f.label, f.validationCheck);
            const field = {...player[f.key], error};
            clone = {...clone, [f.key]: field};
            console.log(f.key, error);

            if (error) {
                ok = false;
            }
        });
        setPlayer(clone);
        return ok;
    }

    const updatePlayer = () => {

        if (validateForm()) {
            const newPlayer =  Object.keys(player).reduce((acc, key)=> {
                const value = typeof player[key].value === 'string'
                    ? player[key].value.trim()
                    : Object.entries(player[key].value).filter(([key, value]) => value===true).map(e => e[0]);
                return {...acc, [key]: value};
            }, {});
    
            props.add(newPlayer);
        }
    }

    const updatePostions = (data) => {
        setPlayer({...player, positions: data});
    }

    return (
        <div className="addplayer-form">
            <form noValidate autoComplete="off">
                {fields.map(f => 
                    <div key={f.key}>
                        {f.type==='text' && <TextField required label={f.label} autoComplete='off'
                            error={Boolean(player[f.key].error)}
                            helperText={player[f.key].error} 
                            onBlur={(e) => validate(e.target.value, f)} />
                        }

                        {f.type==='chooser' && <Chooser field={f} 
                            options={v.positions} 
                            update={updatePostions}
                            data={player[f.key]}
                        />
                        }
                    </div>
                )}
            </form>
            <div className="action-row">
                <Button variant="contained" color="primary" onClick={updatePlayer} >
                    Save
                </Button>
            </div>
        </div> 
    )
}

function PlayerList (props) {
    return (
        <div className="players-list">
            <div>
                <div className="sl">#</div>
                <div className="name">Name</div>
                <div className="height">Height</div>
                <div className="position">Position(s)</div>
            </div>
            {props.players.map((plyr, idx) =>(
                <div key={`${idx}-${plyr.firstName}`}>
                    <div className="sl">{plyr.id}.</div>
                    <div className="name">{plyr.firstName} {plyr.lastName} </div>
                    <div className="height">{plyr.height} cm</div>
                    <div className="position"> {plyr.positions.map(p => 
                        <Chip key={p} variant="outlined" 
                            color="primary" size="medium" avatar={<Avatar>{p}</Avatar>}
                            label={v.positionLabel(p)}
                        />
                    )}</div>
                </div>
            ))}
        </div>
    )
}

export default function TeamList (props) {
    const [players, setPlayers] = useState(props.team);
    const [showAddPlayer, setShowAddPlayer] = useState(false);

    const add = (player) => {
        // add ID
        const clone = {...player, id: (players.length + 1)};
        
        setPlayers([...players, clone]);
        setShowAddPlayer(false);
        props.update([...players, clone]);
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
