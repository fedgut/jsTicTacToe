const pl1Name = document.getElementById('pl1-name');
const pl2Name = document.getElementById('pl2-name');
const formShow = document.getElementById('player-form');
const scoreKeeper = document.querySelector('.score-keeper');
const initMessage = document.getElementById('initial-message');
const startMessage = document.getElementById('start-game');
const pl1WinsTable = document.getElementById('pl1-wins');
const pl2WinsTable = document.getElementById('pl2-wins');
// game logic
const game = (player1, player2) => {
  const board = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
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
    return possible;
  };

  let gameOver = false;
  let winner = 'null';

  const getWinner = () => winner;
  const setWinner = win => {
    winner = players[win.toUpperCase()];
  };
  const gameState = () => gameOver;
  const endGame = () => {
    gameOver = true;
  };

  const allStrings = el => typeof el === 'string';
  const uniqArr = el => [...new Set(el)].length === 1;

  const checkWin = currentBoard => {
    const filteredArr = currentBoard.filter(e => e.every(allStrings));
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
    if (gameState() && getWinner() !== 'Tie game') {
      document.getElementById('wining-player').innerText = `Player ${getWinner()} wins!`;
      const winnerTable = document.getElementById(`${getWinner()}-wins`);
      winnerTable.innerText = parseInt(winnerTable.innerText, 0) + 1;
    } else if (gameState() && getWinner() === 'Tie game') {
      document.getElementById('wining-player').innerText = `${getWinner()}`;
      const tieTable = document.getElementById('ties-wins');
      tieTable.innerText = parseInt(tieTable.innerText, 0) + 1;
    }
  };

  return {
    board,
    players,
    getWinner,
    move,
    gameState,
    currentBoard,
  };
};
// end game logic

const cells = document.querySelectorAll('.cell-hover');

const setImgSrc = (node, sign) => {
  node.src = `./assets/${sign}-img.png`;
};

// eslint-disable-next-line no-unused-vars
const startGame = form => {
  const newGame = game(form[0].value, form[1].value);
  let sign = 'x';
  cells.forEach(x => {
    x.firstElementChild.src = 'assets/no-img.png';
    x.classList.add('cell-hover');
  });
  cells.forEach(item => {
    item.onclick = function changeImg() {
      if (this.firstElementChild.src.includes('no-img.png')) {
        this.classList.remove('cell-hover');
        newGame.move(sign, this.id);
        setImgSrc(this.firstElementChild, sign);
        sign = sign === 'x' ? 'o' : 'x';
        if (newGame.gameState()) {
          startGame(form);
        }
      }
    };
  });
  pl1Name.innerText = newGame.players.X;
  pl2Name.innerText = newGame.players.O;
  if (form[0].value === '' || form[1].value === '') {
    startMessage.classList.add('d-none');
    initMessage.classList.remove('d-none');
  } else {
    initMessage.classList.add('d-none');
    formShow.classList.add('d-none');
    scoreKeeper.classList.remove('d-none');
    pl1WinsTable.id = `${newGame.players.X}-wins`;
    pl2WinsTable.id = `${newGame.players.O}-wins`;
    startMessage.classList.remove('d-none');
  }
};

window.onload = function ready() {
  const playerForm = document.getElementById('player-form');
  playerForm.reset();
  const btn = document.getElementById('submit');
  const select = document.querySelectorAll('.player-input');
  select.forEach(item => {
    const ipt = item.getElementsByTagName('input');
    ipt[0].addEventListener('input', () => {
      if (playerForm.name1.value > '' && playerForm.name2.value > '') {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });
  });
};
