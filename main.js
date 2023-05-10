const gameBrain = (() => {
  let gameIsOver = true;
  let getGameIsOver = () => gameIsOver;

  let winner = false;
  const getIsAWinner = () => winner;

  let playerTurn = "X";
  const togglePlayerTurn = () => (playerTurn = playerTurn === "X" ? "O" : "X");
  const getPlayerTurn = () => playerTurn;
  const setPlayerTurn = (turn) => (playerTurn = turn);

  let gameBoard = Array(9).fill(null);
  const getGameBoard = () => gameBoard;
  const resetGameBoard = () => {
    gameBoard = [...gameBoard].map((tile) =>
      tile || tile === 0 ? null : tile
    );
  };
  const updateGameBoard = (tileId) => {
    const tileNumber = parseInt(tileId.split("-")[1]);
    gameBoard = gameBoard.map((tile, index) =>
      index === tileNumber ? playerTurn : tile
    );
  };

  const nextTurn = (tileId) => {
    updateGameBoard(tileId);
    screenController.updateGameTile(tileId);
    checkIfGameIsOver();
    if (!gameIsOver) {
      togglePlayerTurn();
      screenController.setPlayerDisplay();
    }
  };

  const endGame = () => {
    gameIsOver = true;
    screenController.setPlayerDisplay();
    StartButton.innerText = "Tic Tac Toe";
    resetGameBoard();
    playerTurn = "X";
    winner = false;
  };

  const playRound = () => {
    if (gameIsOver) {
      gameIsOver = false;
      screenController.clearGameBoard();
      screenController.setPlayerDisplay();
      screenController.unhidePlayerDisplay();
    }
  };

  const checkForWinner = () => {
    const row1 = gameBoard.slice(0, 3).join("");
    const row2 = gameBoard.slice(3, 6).join("");
    const row3 = gameBoard.slice(6, 9).join("");

    const col1 = gameBoard[0] + gameBoard[3] + gameBoard[6];
    const col2 = gameBoard[1] + gameBoard[4] + gameBoard[7];
    const col3 = gameBoard[2] + gameBoard[5] + gameBoard[8];

    const diag1 = gameBoard[0] + gameBoard[4] + gameBoard[8];
    const diag2 = gameBoard[2] + gameBoard[4] + gameBoard[6];

    const winRegex = /XXX|OOO/;
    if (winRegex.test(row1) || winRegex.test(row2) || winRegex.test(row3)) {
      console.log("row win!");
      endGame();
    } else if (
      winRegex.test(col1) ||
      winRegex.test(col2) ||
      winRegex.test(col3)
    ) {
      console.log("column win!");
      winner = true;
      endGame();
    } else if (winRegex.test(diag1) || winRegex.test(diag2)) {
      console.log("diagonal win");
      winner = true;
      endGame();
    } else if (gameBoard.filter((tile) => tile === null).length === 0) {
      console.log("its a draw");
      endGame();
    }
  };

  const checkIfGameIsOver = () => {
    checkForWinner();
  };

  // determine if a user click is legit and execute the appropriate action if so
  window.addEventListener("click", (e) => {
    const clickedElement = e.target;
    const id = clickedElement.id;

    if (/start-button/.test(id)) {
      // the user clicked on the start button
      if (gameIsOver) {
        playRound();
      }
    } else if (/tile-[0-9]/.test(id) && !clickedElement.firstChild) {
      // the user clicked on a empty game tile
      if (!gameIsOver) {
        nextTurn(id);
      }
    }
  });

  return {
    getGameBoard,
    getGameIsOver,
    resetGameBoard,
    getPlayerTurn,
    togglePlayerTurn,
    setPlayerTurn,
    getIsAWinner,
  };
})();

const screenController = (() => {
  function setInitialView() {
    const body = document.querySelector("body");
    body.appendChild(MainDiv);
    body.appendChild(FooterWithBasicCopyright);
  }

  const clearGameBoard = () => {
    const tiles = document.querySelectorAll(".game-tile");
    tiles.forEach((tile) => {
      while (tile.firstChild) {
        tile.removeChild(tile.firstChild);
      }
    });
  };

  const setPlayerDisplay = () => {
    const display = document.querySelector(".player-turn-div");
    if (!gameBrain.getGameIsOver()) {
      if (!gameBrain.getIsAWinner()) {
        display.innerText = `It's ${gameBrain.getPlayerTurn()}'s turn`;
      }
    } else {
      console.log("winner", gameBrain.getIsAWinner());
      if (gameBrain.getIsAWinner()) {
        display.innerText = `${gameBrain.getPlayerTurn()} wins!`;
      } else {
        display.innerText = "It's a draw";
      }
    }
  };

  const unhidePlayerDisplay = () => {
    const display = document.querySelector(".player-turn-div");
    display.classList.remove("hidden");
  };

  const updateGameTile = (id) => {
    const tile = document.querySelector(`#${id}`);
    const symbol = Object.assign(document.createElement("img"), {
      src: `assets/icons/${
        gameBrain.getPlayerTurn() === "X" ? "X" : "O"
      }-charcoal.png`,
    });

    tile.appendChild(symbol);
  };

  return {
    setInitialView,
    clearGameBoard,
    setPlayerDisplay,
    unhidePlayerDisplay,
    updateGameTile,
  };
})();

const Player = () => {};

const FooterWithBasicCopyright = (() => {
  const footer = Object.assign(document.createElement("footer"), {});

  const copyrightContainer = Object.assign(document.createElement("div"), {
    className: "copyright-container",
    innerText: `© Carlin Mitchell ${new Date().getFullYear()}`,
  });

  const topContainer = Object.assign(document.createElement("div"), {
    className: "top-attribution",
    innerText: "Inspired by",
  });

  const topLink = Object.assign(document.createElement("a"), {
    className: "top-link",
    innerText: "The Odin Project",
    href: "https://www.theodinproject.com/",
  });

  const githubLink = Object.assign(document.createElement("a"), {
    href: "https://github.com/carlin-mitchell/TicTacToe-TOP",
  });

  const githubIcon = Object.assign(document.createElement("img"), {
    src: "assets/github/github-mark-white.png",
  });

  githubLink.appendChild(githubIcon);
  copyrightContainer.appendChild(githubLink);
  topContainer.appendChild(topLink);
  footer.appendChild(copyrightContainer);
  footer.appendChild(topContainer);

  return footer;
})();

const PlayerTurnDiv = (() => {
  const div = Object.assign(document.createElement("div"), {
    className: "player-turn-div hidden",
    innerText: "It's X's Turn",
  });
  return div;
})();

const StartButton = (() => {
  const startingText = "Tic Tac Toe";
  const button = Object.assign(document.createElement("div"), {
    id: "start-button",
    className: "unselectable",
    innerText: startingText,
    onmouseover: function () {
      if (gameBrain.getGameIsOver()) {
        this.innerText = startingText.replace("Toe", "Go!");
      }
    },
    onmouseout: function () {
      if (gameBrain.getGameIsOver()) {
        this.innerText = startingText;
      }
    },
  });
  return button;
})();

const TitleRow = (() => {
  const row = Object.assign(document.createElement("div"), {
    className: "title",
  });
  row.appendChild(StartButton);
  return row;
})();

const GameTile = () => {
  const tile = Object.assign(document.createElement("div"), {
    className: "game-tile",
  });
  return tile;
};

const GameDiv = (() => {
  const div = Object.assign(document.createElement("div"), {
    className: "game-div",
  });

  for (let i = 0; i < 9; i++) {
    const tile = GameTile();
    tile.id = `tile-${i}`;
    div.appendChild(tile);
  }

  return div;
})();

const GameRow = (() => {
  const row = Object.assign(document.createElement("div"), {
    className: "game-row",
  });
  row.appendChild(GameDiv);
  return row;
})();

const MainDiv = (() => {
  const main = document.createElement("main");
  main.appendChild(TitleRow);
  main.appendChild(PlayerTurnDiv);
  main.appendChild(GameRow);
  return main;
})();

screenController.setInitialView();

gameBrain.resetGameBoard();
