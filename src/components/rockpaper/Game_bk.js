import React, { useState, useContext } from 'react'
// import classNames from 'classnames'
import Tile from './Tile'
import { PathContext } from '../../utils/PathContext'
import '../../styles/rockpaper.scss'

export const choices = ['rock', 'paper', 'scissors']

export const Game = ({ location }) => {
    // eslint-disable-next-line no-unused-vars
    const [ pathName, setPathName ] = useContext(PathContext)
    setPathName(location.pathname)

    const [ choice, setChoice ] = useState(null)
    const [ aipick, setAiPick ] = useState(null)
    const [ aiLoading, setAiLoading ] = useState(false)
    const [ winner, setWinner ] = useState(null)

    const tileClicked = (tile) => {
        if (aiLoading || winner) {
            return
        }
        setAiLoading(true)
        setAiPick(null)
        setChoice(tile)
        randomAiPick(tile)
    }

    const randomAiPick = (userchoice) => {
        const aichoice = choices[Math.floor(Math.random() * choices.length)]
        setAiPick(aichoice)
        setAiLoading(false)
        setWinner(getWinner(userchoice, aichoice))
    }

    const getWinner = (choice, aipick) => {
        if (choice === aipick) {
            return {
                player: 'none',
                type: choice
            }
        } else if (
            (choice === 'rock' && aipick === 'scissors') ||
            (choice === 'paper' && aipick === 'rock') ||
            (choice === 'scissors' && aipick === 'paper')
        ){
            return {
                player: 'user',
                type: choice
            }
        } else {
            return {
                player: 'pc',
                type: aipick
            }
        }
    }
    const displayStatus = () => {
        console.log('users choice => ', choice)
        console.log('ai choice =>', aipick)
        if( winner && winner.player === 'user'){
            return 'Wohoo! You WON.'
        } else  if( winner.player === 'pc') {
            return 'Ouch! You LOST.'
        } else  if( winner.player === 'none') { 
            return `It's a TIE!`
        }
    }

    const playNewGame = () => {
        setChoice(null)
        setAiPick(null)
        setAiLoading(false)
        setWinner(null)
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
            { winner &&
                <div className="pop status-bar">
                    <span>{ displayStatus() }</span>
                    <button className='button' onClick={ playNewGame }>Roll again ?</button>
                </div>
            }
        </div>
    )
}
