const cells = document.querySelectorAll('.cell-hover');

const setImgSrc = (node, sign) => {
  node.src = `./assets/${sign}-img.png`;
};

let sign = 'x';
cells.forEach(item => {
  item.onclick = function changeImg() {
    if (this.firstElementChild.src.includes('no-img.png')) {
      this.classList.remove('cell-hover');
      setImgSrc(this.firstElementChild, sign);
      sign = sign === 'x' ? 'o' : 'x';
    }
  };
});

const startGame = form => {
  const initMessage = document.getElementById('initial-message');
  const startMessage = document.getElementById('start-game');
  if (form[0].value === '' || form[1].value === '') {
    startMessage.classList.add('d-none');
    initMessage.classList.remove('d-none');
  } else {
    initMessage.classList.add('d-none');
    startMessage.classList.remove('d-none');
  }
};

window.onload = function ready() {
  const playerForm = document.getElementById('player-form');
  playerForm.reset();
  const gameBoard = document.getElementById('game-board');
  // const rows = gameBoard.querySelectorAll('.row');
  const btn = document.getElementById('submit');
  const initMessage = document.getElementById('initial-message');
  const startMessage = document.getElementById('start-game');
  const select = document.querySelectorAll('.player-input');
  select.forEach((item, i) => {
    const ipt = item.getElementsByTagName('input');
    ipt[0].addEventListener('input', event => {
      if (playerForm.name1.value > '' && playerForm.name2.value > '') {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });
  });
};
