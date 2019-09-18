
/***    CUSTOM HOOK - for Rock-Paper-Scissors game status       ***/
/***    Just for experimentation fun - no real logic re-use     ***/

import { useState } from 'react'
import { rockpaper } from '../../../utils/helper'

const useGameStatus = () => {
    const initialState = {
        winner: null,
        message: '',
        choice: null,
        aipick: null
    }
    const [ state, setState ] = useState(initialState)

    const setChoices = (choice, aipick) => {
        setState({ ...state, choice, aipick })
    }

    const setWinner = () => {
        setState(prevState => {
            const { choice, aipick } = prevState
            return { ...prevState, winner: rockpaper.getWinner(choice, aipick) }
        })
        setMessage()
    }

    const setMessage = () => {
        const getMessage = (winner) => {
            if( winner && winner.player === 'user'){
                return 'Wohoo! You WON.'
            } else  if( winner.player === 'pc') {
                return 'Ouch! You LOST.'
            } else  if( winner.player === 'none') { 
                return `It's a TIE!`
            }
        }
        setState(prevState => {
            const message = getMessage(prevState.winner)
            return { ...prevState, message }
        })
    }

    const resetGameStatus = () => {
        setState(initialState)
    }

    return {
        choice: state.choice,
        aipick: state.aipick,
        winner: state.winner,
        message: state.message,
        setWinner,
        // setMessage,
        resetGameStatus,
        setChoices: (choice, aipick) => setChoices(choice, aipick)
    }
}

export default useGameStatus
