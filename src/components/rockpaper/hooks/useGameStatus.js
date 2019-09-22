
/***    CUSTOM HOOK - for Rock-Paper-Scissors game status       ***/
/***    Just for experimentation fun - no real logic re-use     ***/

import { useState, useReducer } from 'react'
import { rockpaper } from '../../../utils/helper'
import scoresReducer from '../../../utils/scoresReducer'


const useGameStatus = () => {
    const initialState = {
        winner: null,
        message: '',
        choice: null,
        aipick: null,
    }
    const initialScores = {
        p1Score: 0,
        p2Score: 0,
        tieScore: 0
    }
    const [ state, setState ] = useState(initialState)
    const [ scores, dispatchScores ] = useReducer(scoresReducer, initialScores)

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
                dispatchScores({ type: 'p1win' })
                return 'Wohoo! You WON.'
            } else  if( winner.player === 'pc') {
                dispatchScores({ type: 'p2win' })
                return 'Ouch! You LOST.'
            } else  if( winner.player === 'none') { 
                dispatchScores({ type: 'tie' })
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
        resetGameStatus,
        setChoices: (choice, aipick) => setChoices(choice, aipick),
        scores
    }
}

export default useGameStatus
