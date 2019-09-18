import React from 'react'

const Square = ({ value, handleClick, posClass = '', winner, gameOver }) => {
	const paleClass = (winner || gameOver) ? 'pale' : ''
	return (
		<div className={`square ${posClass} ${paleClass}`} onClick={ handleClick }>
			<div className={value}>{ value }</div>
		</div>
	)
}

export default Square
