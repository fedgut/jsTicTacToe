const Game = (player1, player2) => {
  const board = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
  };
  const players = { X: player1, O: player2, Z: 'Tie game' };

  const currentBoard = () => `\n${board[1]} | ${board[2]} | ${board[3]}
==========
${board[4]} | ${board[5]} | ${board[6]}
==========
${board[7]} | ${board[8]} | ${board[9]}`;

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
  let winner = 'null';

  const getWinner = () => winner;
  const setWinner = (win) => { winner = players[win]; };
  const gameState = () => gameOver;
  const endGame = () => { gameOver = true; };

  const allStrings = (el) => typeof el === 'string';
  const uniqArr = (el) => [...new Set(el)].length === 1;

  const checkWin = (currentBoard) => {
    const filteredArr = currentBoard.filter((e) => e.every(allStrings));
    let winner = filteredArr.filter(uniqArr) || [];
    if (winner.length > 0) {
      winner = winner[0].pop();
      setWinner(winner);
      endGame();
    } else if (currentBoard.length === filteredArr.length) {
      setWinner('Z');
      endGame();
    }
  };

  const move = (sign, position) => {
    if (board[position] && sign) {
      board[position] = sign;
    }
    checkWin(possibleWins());
    if (gameState()) {
      console.log(getWinner());
    }
  };

  return {
    board, players, getWinner, move, gameState, currentBoard,
  };
};
// const myGame = Game('Jim', 'Jeff');
//
// myGame.move('X', 3);
// myGame.move('O', 2);
// myGame.move('X', 1);
// myGame.move('X', 5);
// myGame.move('O', 4);
// myGame.move('X', 6);
// myGame.move('O', 9);
// myGame.move('x', 8);
// myGame.move('O', 7);
// console.log(myGame.players);
// console.log(myGame.currentBoard());
