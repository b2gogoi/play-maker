import React from 'react';

export default function Quarter (props) {
    return (
        <>
            <h2>Quarter Position Assignment</h2>
            <span>Assign players to positions for the quarter</span>
            <span>{props.team.length}</span>
        </>
    )
}
