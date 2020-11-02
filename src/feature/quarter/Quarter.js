import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Select } from '@material-ui/core';
import * as v from '../../util/utils';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        marginRight: theme.spacing(5),
        minWidth: 280,
      },
      selectEmpty: {
        marginTop: theme.spacing(-1),
      },
  }));

function Position (props) {
    const classes = useStyles();
    const [player, setPlayer] = useState(props.player);
    const [error, setError] = useState();

    const renderPlayers = (code) => {
        const availablePlayers = props.players.filter(p => {
            return p.positions.includes(code);
        });
        return availablePlayers.map(player => <MenuItem key={player.id} value={player.id}>{player.firstName} {player.lastName}</MenuItem>);
    
    };

    const handleChange = (e) => {
        const playerId = e.target.value;
        setPlayer(playerId);
        let hasDuplicate = false;
        

        let alreadySet = false;
        for(let id of Object.values(props.quarter)) {
            if (playerId === id) {
                alreadySet = true;
            }
        }

        if(alreadySet) {
            setError('Player is already selected for another position');
            hasDuplicate = true;
        } else {
            setError();
        }
        props.update(props.position.code, playerId, hasDuplicate);

    }
    return (
        <FormControl variant="outlined" className={classes.formControl} error={error} disabled={props.disabled}>
            <Select
                value={player || ''}
                onChange={handleChange}
                className={classes.selectEmpty}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value="" disabled>
                    <em>-----</em>
                </MenuItem>
                {renderPlayers(props.position.code)}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

const isAllQuarterPositionsFilled = (qtr) => {
    let allSet = true;
    let selectPlayers = Object.values(qtr);
    for(let p of selectPlayers) {
        if (!p) {
            allSet = false;
        }
    }
    return allSet;
}

export default function Quarter (props) {
    const [quarter, setQuarter] = useState(props.quarter);
    const [isQuarterSet, setIsQuarterSet] = useState(isAllQuarterPositionsFilled(props.quarter));
    const [error, setError] = useState();
    const [hasDuplicate, setHasDuplicate] = useState(false);

    const updatePosition = (code, playerId, hasDuplicatePlayer) => {
        console.log(code, playerId);
        setQuarter({...quarter, [code]: playerId});
        setHasDuplicate(hasDuplicatePlayer);
    };

    const updateQuarter = () => {
        if(!isAllQuarterPositionsFilled(quarter)) {
            setError('Players must be selected for all positions');

        } else if(hasDuplicate) {
            setError('Player is already selected for another position');
        } else {
            setIsQuarterSet(true);
            setError();
            props.update(quarter);
        }
    }

    return (
        <>
            <h2>Quarter Position Assignment</h2>
            {!isQuarterSet && <span><em>Assign players to all {v.positions.length} positions for the quarter</em></span>}
            {isQuarterSet && <span><em>Following Players are assigned for all the {v.positions.length} positions.</em></span>}
            <div className="quarter-box">
                {v.positions.map(p => <div key={p.code}>
                        <div><label>{v.positionLabel(p.code)}</label></div>
                        <div>
                            <Position position={p} players={props.team} player={quarter[p.code]} update={updatePosition} quarter={quarter} disabled={isQuarterSet} />
                        </div>
                    </div>
                )}
            </div>
            {error && <div className="error">{error}</div>}
            <div className="action-row">
                {isQuarterSet && <Button variant="contained" color="primary" onClick={e => setIsQuarterSet(false)} >
                    Edit Positions
                </Button>}
                {!isQuarterSet && <Button variant="contained" color="primary" onClick={updateQuarter} >
                    Save Quarter Positions
                </Button>}
            </div>
        </>
    )
}
