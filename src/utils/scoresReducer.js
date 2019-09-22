const scoresReducer = (state, action) => {
    switch (action.type) {
        case 'p1win':
            return {
                ...state,
                p1Score: state.p1Score + 1
            }
        case 'p2win':
            return {
                ...state,
                p2Score: state.p2Score + 1
            }
        case 'tie':
            return {
                ...state,
                tieScore: state.tieScore + 1
            }
        default:
            return state;
    }
}

export default scoresReducer
