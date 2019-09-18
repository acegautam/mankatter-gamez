import React from 'react'
import { Link } from 'react-router-dom'

const GameNav = () => (
    <nav>
        <ul>
            <li><Link to='/'>Portal</Link></li>
            <li><Link to='/tictactoe'>Tic Tac Toe</Link></li>
            <li><Link to='/rockpaper'>Rock Paper Scissors</Link></li>
        </ul>
    </nav>
)

export default GameNav
