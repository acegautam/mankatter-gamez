import React from 'react'
import classNames from 'classnames'
import Board from './Board'
import { calculateWinner } from '../../utils/helper'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = INTITIAL_STATE
    }
    setInitialState () {
        this.setState(INTITIAL_STATE)
    }

    handleSlotClicked (i) {
		const history = this.state.history.slice(0, this.state.step + 1)
        const current = history[history.length - 1]
        const squares = [...current.squares]
        let { moves, player } = current
		moves++
		player = (player === null || player === 'O') ? 'X' : 'O'
		squares[i] = player
		const nextPlayer  = (player === null || player === 'O') ? 'X' : 'O'
        const winner = calculateWinner(squares)
		this.setState(prevState => ({
            history: [
                ...history,
				{ 
					squares,
					moves,
					player,
					nextPlayer,
					winner,
					gameOver: (moves === 9)
				}
			],
			step: history.length
        }))
    }
    playNewGame () {
        this.setInitialState()
	}
	
	handleMove (i) {
		if(!i) {
			this.setInitialState()
			return
		}
		this.setState({
			step: i
		})
	}

    render() {
        console.log('state => ', this.state)
		const { history, step } = this.state
		console.log('history => ', history)

		const current = history[step]
        const { winner, gameOver, player, nextPlayer } = current

        const getStatus = () => {
            if(winner) {
                return `${winner} is the winner!`
            }
            if(gameOver) {
                return `Game over. It's a tie!`
            }
            return `Next player: ${nextPlayer || 'X'}`
        }

        const winnerClass = classNames('status', {
            'gamewon': winner,
            'tie': (!winner && gameOver)
        })
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        player = { player } 
                        winner = { winner } 
                        gameOver = { gameOver } 
                        squares = { current.squares }
                        handleSlotClicked = { (i) => this.handleSlotClicked (i) }
                    />
                    { player && (!(gameOver || winner)) &&
                        <button className='btn restart' 
                            onClick={ () => this.handleMove(0) }>Wanna restart?</button>
                    }
                    { (gameOver || winner) && 
                        <button className='btn newgamebtn' 
                            onClick={ () => this.playNewGame() }>Play again?</button>
                    }
                </div>
                <div className="game-info">
                    <div className={winnerClass}>{ getStatus() }</div>
					{ player &&
						<ol>
							{
								history.map((move, idx) => {
                                    if(!idx) {
                                        return null
                                    }
									const text = `Go to move # ${idx}`
									return (
										<li key={idx}>
											<button onClick={ () => this.handleMove(idx) }>{text}</button>
										</li>
									)
								})

							}
						</ol>
					}
                </div>
            </div>
        );
    }
}

const INTITIAL_STATE = {
    history: [{
		squares: Array(9).fill(null),
		player: null,
		nextPlayer: null,
		winner: null,
		gameOver: false,
		moves: 0,
	}],
	step: 0	
}

export { Game }
