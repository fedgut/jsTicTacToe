const Game = (player1, player2) => {
  const board = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
  };
  const players = { X: player1, O: player2 };

  const possibleWins = () => {
    const possible = [
      [board[1], board[2], board[3]],
      [board[1], board[5], board[9]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[3], board[6], board[9]],
      [board[3], board[5], board[7]],
      [board[4], board[5], board[6]],
      [board[7], board[8], board[9]],
    ];
    // All strings
    // Strings are all equal
    // all strings not all equal, it's a t
    return possible;
  };

  let gameOver = false;
  let winner = null;

  const setWinner = (winSign) => {
    winner = winSign;
  };

  const endGame = () => {
    gameOver = true;
  };

  const checkWin = () => {
    const allStrings = (el) => typeof el === 'string';
    const possible = possibleWins().filter(x => {
      if (x.every(allStrings) && [...new Set(x)].length > 1) {
        return x;
      }
      if (x.every(allStrings) && [...new Set(x)].length === 1) {
        setWinner(x[0]);
        endGame();
        console.log(winner, gameOver);
        return x;
      }
    });
  };

  const move = (sign, position) => {
    if (board[position] && sign) {
      board[position] = sign;
      checkWin();
    }
  };

  return {
    board, players, gameOver, winner, move,
  };
};
const myGame = Game('Jim', 'Jeff');
myGame.move('X', 3);
myGame.move('O', 2);
myGame.move('O', 1);
myGame.move('O', 5);
myGame.move('O', 9);
console.log(myGame);
