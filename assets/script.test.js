import game from './script';

const player1 = 'Player1';
const player2 = 'Player2';

test('Game has a board', () => {
  const game1 = game(player1, player2);
  expect(game1.board).not.toBeUndefined();
});

test('Game.board is the correct object', () => {
  const game1 = game(player1, player2);
  expect(game1.board).toEqual({
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  });
});

test('Game has players', () => {
  const game1 = game(player1, player2);
  expect(game1.players).toEqual({ X: player1, O: player2, Z: 'Tie game' });
});

test('Game can set a move when the target position has not been used', () => {
  const game1 = game(player1, player2);
  expect(game1.board[1]).toEqual(1);
  game1.move('X', 1);
  expect(game1.board[1]).toEqual('X');
});

test('Game will declare a winner wen win conditions are met', () => {
  const game1 = game(player1, player2);
  game1.board = {
    1: 'X',
    2: 'X',
    3: 'X',
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };
  expect(Array.from(game1.board)).toEqual('X');
  // game1.checkWin(game1.currentBoard());
  // expect(game1.getWinner().toEqual(player1));
});