import React from 'react'
import Square from './Sqaure'

const Board = ({ squares, winner, gameOver, handleSlotClicked }) => {
    const handleClick = (i) => {
		if(squares[i]) {
			return
        }
        handleSlotClicked(i);
    }
    
	const renderSquare = (i, posClass) => {
		return <Square 
            value={squares[i]}
            posClass={posClass} 
            winner = { winner } 
            gameOver = { gameOver } 
			handleClick={() => handleClick(i)} />;
    }

    return (
        <>
            {renderSquare(0, 'top left')}
            {renderSquare(1, 'top')}
            {renderSquare(2, 'top right')}
            {renderSquare(3, 'left')}
            {renderSquare(4)}
            {renderSquare(5, 'right')}
            {renderSquare(6, 'bottom left')}
            {renderSquare(7, 'bottom')}
            {renderSquare(8, 'bottom right')}
        </>
    );
}

export default Board
