import React from 'react'

const ScoreBoard = ({ appearXClass, appearOClass, appearTieClass, score }) => (
    <div className='score-board pop'>
        <div>Player X</div>
        <div>Tie</div>
        <div>Player O</div>
        <div className={ appearXClass }>{ score.x }</div>
        <div className={ appearTieClass }>{ score.tie }</div>
        <div className={ appearOClass }>{ score.o }</div>
    </div>
)

export default ScoreBoard
