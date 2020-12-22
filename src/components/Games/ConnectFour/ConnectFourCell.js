import React from 'react'

const ConnectFourCell = ({cell, nextcolor}) => {
    const {taken, color,id} = cell;

    const nextColorClass = nextcolor= "RED" ? "nextRed" : "nextGreen";
    const classes =  taken ? `connectFourCell ${color}` : `connectFourCell notTaken ${nextColorClass}`;
    return (
        <div id={id} className={classes}>
            
        </div>
    )
}

export default React.memo(ConnectFourCell)
