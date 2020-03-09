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
    9: 9
  };

  const players = { X: player1, O: player2, Z: "Tie game" };

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
      [board[7], board[8], board[9]]
    ];
    return possible;
  };

  let gameOver = false;
  let winner = "null";

  const getWinner = () => winner;
  const setWinner = win => {
    winner = players[win.toUpperCase()];
  };
  const gameState = () => gameOver;
  const endGame = () => {
    gameOver = true;
  };

  const allStrings = el => typeof el === "string";
  const uniqArr = el => [...new Set(el)].length === 1;

  const checkWin = currentBoard => {
    const filteredArr = currentBoard.filter(e => e.every(allStrings));
    let winner = filteredArr.filter(uniqArr) || [];
    if (winner.length > 0) {
      winner = winner[0].pop();
      setWinner(winner);
      endGame();
    } else if (currentBoard.length === filteredArr.length) {
      setWinner("Z");
      endGame();
    }
  };

  const move = (sign, position) => {
    if (board[position] && sign) {
      board[position] = sign;
    }
    checkWin(possibleWins());
    if (gameState() && getWinner() !== "Tie game") {
      document.getElementById(
        "wining-player"
      ).innerText = `Player ${getWinner()} wins!`;
    } else if (gameState() && getWinner() === "Tie game") {
      document.getElementById("wining-player").innerText = `${getWinner()}`;
    }
  };

  return {
    board,
    players,
    getWinner,
    move,
    gameState,
    currentBoard
  };
};
// end game logic

const cells = document.querySelectorAll(".cell-hover");

const setImgSrc = (node, sign) => {
  node.src = `./assets/${sign}-img.png`;
};

const startGame = form => {
  const newGame = game(form[0].value, form[1].value);
  let sign = "x";
  cells.forEach(x => {
    x.firstElementChild.src = "assets/no-img.png";
    x.classList.add("cell-hover");
  });
  cells.forEach(item => {
    item.onclick = function changeImg() {
      if (this.firstElementChild.src.includes("no-img.png")) {
        this.classList.remove("cell-hover");
        newGame.move(sign, this.id);
        setImgSrc(this.firstElementChild, sign);
        sign = sign === "x" ? "o" : "x";
      }
    };
  });

  const initMessage = document.getElementById("initial-message");
  const startMessage = document.getElementById("start-game");
  if (form[0].value === "" || form[1].value === "") {
    startMessage.classList.add("d-none");
    initMessage.classList.remove("d-none");
  } else {
    initMessage.classList.add("d-none");
    startMessage.classList.remove("d-none");
  }
};

window.onload = function ready() {
  const playerForm = document.getElementById("player-form");
  playerForm.reset();
  const btn = document.getElementById("submit");
  const select = document.querySelectorAll(".player-input");
  select.forEach(item => {
    const ipt = item.getElementsByTagName("input");
    ipt[0].addEventListener("input", event => {
      if (playerForm.name1.value > "" && playerForm.name2.value > "") {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });
  });
};

const store = {
  players: ["pl1", "pl2"],
  wins: { X: 0, O: 0, Z: 0 }
};
