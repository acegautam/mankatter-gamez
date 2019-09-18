import React from 'react'
import classNames from 'classnames'

const Tile = ({ type, tileClicked, choice, aitile, winner }) => {
    const image = `./assets/img/${type}.png`
    const winnerTile = (winner && winner.player === 'user' && type === choice  && winner.type === choice) ||
        (winner && winner.player === 'pc' && aitile && winner.type === type)
    const tileClass = classNames('tile', type, {
        'active': (type === choice),
        'aitile': (aitile),
        'winner': winnerTile,
        'muted': winner &&  !(type === choice) && !aitile
    })
    return (
        <div className={ tileClass } onClick={() => {
            if(!aitile) {
                tileClicked(type)
            }
        }}>
            <img src={ image } alt={ type } />
        </div>
    )
}

export default Tile
