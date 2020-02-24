const cells = document.querySelectorAll('.cell-hover');
const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const Player = (name) => {
  let wins = 0;
  const getName = () => name;
  const getWins = () => wins;
  const setWin = () => {
    wins += 1;
    return wins;
  };
  return { getName, getWins, setWin };
};

const GameBoard = (pl1, pl2) => {
  player(pl1);
  player(pl2);
  const board = [null, null, null, null, null, null, null, null, null];
  const setMove = (pos, sign) => {
    board[pos] = sign;
    return board;
  };
  const getBoard = () => board;
  return { setMove, getBoard };
};

const setImgSrc = (node, sign) => {
  node.src = `./assets/${sign}-img.png`;
};

const imgSrc = './assets/x-img.png';
let sign = 'x';
cells.forEach((item) => {
  item.onclick = function () {
    const childElement = this.id;
    newGame.setMove(childElement, sign);
    console.log(newGame.getBoard());
    // board[childElement] = sign;
    setImgSrc(this.firstElementChild, sign);
    sign = (sign === 'x' ? 'o' : 'x');
  };
});

const startGame = (form) => {
  const initMessage = document.getElementById('initial-message');
  const startMessage = document.getElementById('start-game');
  if (form[0].value === '' || form[1].value === '') {
    startMessage.classList.add('d-none');
    initMessage.classList.remove('d-none');
  } else {
    initMessage.classList.add('d-none');
    startMessage.classList.remove('d-none');
    const newGame = GameBoard(form[0].value, form[1].value);
    return newGame;
  }
};

function ready() {
  const playerForm = document.getElementById('player-form');
  playerForm.reset();
  const gameBoard = document.getElementById('game-board');
  // const rows = gameBoard.querySelectorAll('.row');
  const btn = document.getElementById('submit');
  const initMessage = document.getElementById('initial-message');
  const startMessage = document.getElementById('start-game');
  const select = document.querySelectorAll('#player-input');
  select.forEach((item, i) => {
    const ipt = item.getElementsByTagName('input');
    ipt[0].addEventListener('input', (event) => {
      if (playerForm.name1.value > '' && playerForm.name2.value > '') {
        btn.disabled = false;
        // initMessage.classList.add('d-none');
        // startMessage.classList.remove('d-none');
      } else {
        btn.disabled = true;
        // startMessage.classList.add('d-none');
        // initMessage.classList.remove('d-none');
      }
      // console.log(event.srcElement.value);
    });
  });

  // rows.forEach(elem => elem.classList.toggle('d-none'));
  // console.log(gameBoard);
  // console.log(rows);
}

if (document.readyState !== 'loading') {
  ready();
} else {
  document.addEventListener('DOMContentLoaded', ready);
}


// pl2.addEventListener('input', (eve) => {
//   console.log(eve.srcElement.value)
// })
// btn.disabled = false
