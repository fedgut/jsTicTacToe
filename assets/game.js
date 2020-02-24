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
    return possible;
  };

  const gameOver = null;
  const winner = null;
  const turn = null;

  const checkWin = () => {
    possibleWins();
    // check if player wins
  };

  const move = (sign, position) => {
    if (board[position] && sign) {
      board[position] = sign;
      checkWin();
    }
  };

  return {
    board, players, gameOver, winner, turn, move, possibleWins,
  };
};
