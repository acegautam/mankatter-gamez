import React from 'react'
import classNames from 'classnames'
import Board from './Board'
import NewGamePop from './NewGamePop'
import ScoreBoard from './ScoreBoard'
import { PathContext } from '../../utils/PathContext'
import { tictactoe } from '../../utils/helper'

import '../../styles/tictactoe.scss'

class Game extends React.Component {
    constructor(props) {
        super(props)
		this.state = INTITIAL_STATE
		// this.props.setPathName(this.props.location.pathname)
	}
	
    setInitialState () {
        this.setState(INTITIAL_STATE)
	}
	
    handleSlotClicked (i) {
		let seriesNextPlayer = this.state.nextPlayer
		const history = this.state.history.slice(0, this.state.step + 1)
        const current = history[history.length - 1]
        const squares = [...current.squares]
		let { moves, player, winner, gameOver } = current
		if (winner || gameOver) {
			this.playNewGame()
			return
		}
		moves++
		if (!player && seriesNextPlayer) {
			player = seriesNextPlayer
			seriesNextPlayer  = (seriesNextPlayer === null || seriesNextPlayer === 'O') ? 'X' : 'O'
		} else {
			player = (player === null || player === 'O') ? 'X' : 'O'
		}
		squares[i] = player
		const nextPlayer  = (player === null || player === 'O') ? 'X' : 'O'
		winner = tictactoe.getWinner(squares)
		gameOver = (moves === 9)
		const score = this.updateScore(winner, gameOver)
		this.setState(prevState => ({
            history: [
                ...history,
				{ 
					squares,
					moves,
					player,
					nextPlayer,
					winner,
					gameOver
				}
			],
			step: history.length,
			score,
			nextPlayer: seriesNextPlayer
        }))
	}
	
	updateScore (winner, gameOver) {
		const { score } = { ...this.state }
		if(winner === 'X') {
			score.x = (score.x || 0) + 1
		} else if(winner === 'O') {
			score.o = (score.o || 0) + 1
		} else if (gameOver) {
			score.tie = (score.tie || 0) + 1
		}
		return score
	}

    playNewGame () {
		const { nextPlayer } = this.state
        this.setState(prevState => ({
			...INTITIAL_STATE,
			score: prevState.score,
			nextPlayer
		}))
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
		// console.log('state => ', this.state)
		const { history, step, score, nextPlayer: seriesNextPlayer } = this.state
		const current = history[step]
        // const { winner, gameOver, player } = current
        const { winner, gameOver, player, nextPlayer } = current

        const getStatus = () => {
            if(winner) {
                return `${winner} wins.  let's roll again`
            }
            if(gameOver) {
                return `Game over. It's a tie!`
            }
            // return `Next player: ${nextPlayer || 'X'}`
        }

		const boardBlinkClass = classNames('board', {'blink': (winner || gameOver)})
		const appearNewGameClass = classNames('new-game-msg pop', {'appear': (winner || gameOver)})
		const appearXClass = classNames('score', {'appear': score.x})
		const appearOClass = classNames('score', {'appear': score.o})
		const appearTieClass = classNames('score', {'appear': score.tie})

		const statusMsg = (() => {
			if(winner) {
				return `${winner} wins`
			} else if (gameOver) {
				return 'Tie'
			} else {
				return `${nextPlayer || 'X'} plays`
			}
		})()

        return (
            <div className="game tictactoe">
				{/* Using ContextApi approach for class component */}
				<PathContext.Consumer>
					{ ([ pathName, setPathName ]) => { setPathName(this.props.location.pathname)} }
				</PathContext.Consumer>
				<div className='title-box'>
					<p className='restart' title='start again?' onClick={ () => this.playNewGame() }>
						<i className="fas fa-redo"></i>
					</p>
					<p className='title pop'>Tic - Tac - Toe</p>
					<p className='turn pop'>{ statusMsg }</p>
					
				</div>
                <div className={ boardBlinkClass }>
                    <Board
                        player = { player } 
                        winner = { winner } 
                        gameOver = { gameOver } 
                        squares = { current.squares }
                        handleSlotClicked = { (i) => this.handleSlotClicked (i) }
                    />
					<NewGamePop 
						appearClass={ appearNewGameClass }
						nextPlayer = { seriesNextPlayer }
						playNewGame = { () => this.playNewGame() }
						getStatus = { getStatus } 
					/>
                </div>
				<ScoreBoard
					appearXClass = { appearXClass }
					appearOClass = { appearOClass }
					appearTieClass = { appearTieClass }
					score = { score }
				/>
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
		moves: 0
	}],
	step: 0,
	score: {
		x: 0,
		o: 0,
		tie: 0
	},
	nextPlayer: 'X'
}

export { Game }
