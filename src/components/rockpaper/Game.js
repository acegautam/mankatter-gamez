import React, { useState, useContext } from 'react'
import Tile from './Tile'
import { PathContext } from '../../utils/PathContext'
import useGameStatus from './hooks/useGameStatus'
import '../../webcomponents/scoreboard'
import '../../styles/rockpaper.scss'

export const choices = ['rock', 'paper', 'scissors']

export const Game = ({ location }) => {
    // eslint-disable-next-line no-unused-vars
    const [ pathName, setPathName ] = useContext(PathContext)
    setPathName(location.pathname)

    // Built-in hook : useState
    const [ aiLoading, setAiLoading ] = useState(false)

    // Custom hook : useGameStatus
    const { message, winner, choice, aipick, 
        setWinner, resetGameStatus, setChoices, scores } = useGameStatus()

    const tileClicked = (tile) => {
        if (aiLoading || winner) {
            return
        }
        setAiLoading(true)
        setChoices(tile, null)
        randomAiPick(tile)
    }

    const randomAiPick = (userchoice) => {
        const aichoice = choices[Math.floor(Math.random() * choices.length)]
        setChoices(userchoice, aichoice)
        setAiLoading(false)
        setWinner()
    }
    return (
        <div className='game rockpaper'>
            <p className="pop title">Rock - Paper - Scissors</p>
            <div className='board'>
                <div className='user-choices'>
                    <Tile type='rock' tileClicked={ tileClicked } 
                        choice={ choice } winner={ winner } />
                    <Tile type='paper' tileClicked={ tileClicked } 
                        choice={ choice } winner={ winner } />
                    <Tile type='scissors' tileClicked={ tileClicked } 
                        choice={ choice } winner={ winner } />
                </div>
                { !choice &&
                    (<div className='msg pop'>Chose your pick...</div>)
                }
                <div className='ai-choice'>
                    { aipick &&
                        (<Tile aitile={ true } type={ aipick } winner={ winner } />)
                    }
                </div>
            </div>
                <div className='status-bar'>
                    { winner &&
                        <div className="pop">
                            <span>{ message }</span>
                            <button className='button' onClick={ resetGameStatus }>Roll again ?</button>
                        </div>
                    }
                    <score-board
                        p1score={scores.p1Score}
                        p2score={scores.p2Score}
                        tiescore={scores.tieScore}
                    ></score-board>
                </div>
        </div>
    )
}
