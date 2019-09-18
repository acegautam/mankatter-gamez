import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { PathContext } from '../../utils/PathContext'

import '../../styles/portal.scss'

export const Portal = ({ location }) => {
    // eslint-disable-next-line no-unused-vars
    const [ pathName, setPathName ] = useContext(PathContext)
    setPathName(location.pathname)
    return (
    <div className='portal'>
        <p className='pop'>What would you like to play today?</p>
        <section className='game-grid'>
            <div className="game game1">
                <h2>Tic Tac Toe</h2>
                <p>Strategy game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game..</p>
                <img src="./assets/img/tic-tac-toe.svg" alt="tic tac toe" />
                <Link to="/tictactoe" className="cta"><span role="img" aria-label='emoji'>🎲 Wanna play?</span></Link>
            </div>
            <div className="game game2">
                <h2>Rock Paper Scissors</h2>
                <p>Fun, hand game usually played between two people, in which each player simultaneously forms one of three shapes with an outstretched hand. These shapes are "rock", "paper", and "scissors"</p>
                <img src="./assets/img/paper.svg" alt="rock paper scissors" />
                <Link to="/rockpaper" className="cta"><span role="img" aria-label='emoji'>🎲 Wanna play?</span></Link>
            </div>
        </section>
        <p className='note'>Created with <span className="love" role="img" aria-label='emoji'>❤️</span> by Ace Gautam</p>
    </div> 
)}
