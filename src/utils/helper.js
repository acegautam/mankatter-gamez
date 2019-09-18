/***    Helper Utility functions for the game    ***/

// Determine TicTacToe winner
const tictactoe = {
  getWinner: (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}

const rockpaper = {
  getWinner: (choice, aipick) => {
    if (choice === aipick) {
      return {
        player: 'none',
        type: choice
      }
    } else if (
      (choice === 'rock' && aipick === 'scissors') ||
      (choice === 'paper' && aipick === 'rock') ||
      (choice === 'scissors' && aipick === 'paper')
    ) {
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
}

export {
  tictactoe, rockpaper
}