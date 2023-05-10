const gameBrain = (() => {
  let gameIsOver = true;
  let getGameIsOver = () => gameIsOver;

  let winner = false;

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
    togglePlayerTurn();
    screenController.setPlayerDisplay();
    checkIfGameIsOver();
  };

  const playRound = () => {
    gameIsOver = false;
    screenController.clearGameBoard();
    screenController.unhidePlayerDisplay();
  };

  const checkForWinner = () => {};

  const checkIfGameIsOver = () => {
    if (gameBoard.filter((tile) => tile === null).length === 0) {
      //all the tiles are filled
      gameIsOver = true;
      resetGameBoard();
      screenController.setPlayerDisplay();
      StartButton.innerText = "Tic Tac Toe";
    }
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
    } else if (/tile-[0-9]/.test(id)) {
      // the user clicked on a game tile
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
      display.innerText = `It's ${gameBrain.getPlayerTurn()}'s turn`;
    } else {
      display.innerText = "It's a draw";
    }
  };

  const unhidePlayerDisplay = () => {
    const display = document.querySelector(".player-turn-div");
    display.classList.remove("hidden");
  };

  const updateGameTile = (id) => {
    const tile = document.querySelector(`#${id}`);
    console.log(id);
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

// window.addEventListener("click", (e) => {
//   const clickedItem = e.target;
//   //test if the user clicked on a game tile
//   if (/tile-[0-9]/.test(clickedItem.id)) {
//     const playerTurn = gameBrain.getPlayerTurn();
//     clickedItem.appendChild(
//       Object.assign(document.createElement("img"), {
//         src: `/assets/icons/${playerTurn === "X" ? "X" : "O"}-charcoal.png`,
//       })
//     );
//     gameBrain.togglePlayerTurn();
//     screenController.setPlayerDisplay();
//   } else if (/start-button/.test(clickedItem.id)) {
//     screenController.clearGameBoard();
//     gameBrain.setPlayerTurn("X");
//     screenController.unhidePlayerDisplay();
//     screenController.setPlayerDisplay();
//   } else {
//     console.log(e);
//     return;
//   }
// });
