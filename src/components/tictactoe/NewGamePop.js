import React from 'react'

const NewGamePop = ({ appearClass, nextPlayer, playNewGame, getStatus }) => (
    <div className={ appearClass } onClick={() => playNewGame() }>
        <div>{ getStatus() }</div>
        <img src="./assets/img/dice.svg" alt="new game" />
        <div>{nextPlayer} goes next...</div>
    </div>
)

export default NewGamePop
