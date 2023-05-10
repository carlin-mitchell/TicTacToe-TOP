const gameBrain = (() => {
  let gameIsActive = true;

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

  const playRound = () => {
    //
  };

  return {
    getGameBoard,
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
    display.innerText = `It's ${gameBrain.getPlayerTurn()}'s turn`;
  };

  const unhidePlayerDisplay = () => {
    const display = document.querySelector(".player-turn-div");
    console.log(display);
    display.classList.remove("hidden");
  };

  return {
    setInitialView,
    clearGameBoard,
    setPlayerDisplay,
    unhidePlayerDisplay,
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
      this.innerText = startingText.replace("Toe", "Go!");
    },
    onmouseout: function () {
      this.innerText = startingText;
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

MainDiv.addEventListener("click", (e) => {
  const clickedItem = e.target;
  //test if the user clicked on a game tile
  if (/tile-[0-9]/.test(clickedItem.id)) {
    const playerTurn = gameBrain.getPlayerTurn();
    clickedItem.appendChild(
      Object.assign(document.createElement("img"), {
        src: `/assets/icons/${playerTurn === "X" ? "X" : "O"}-charcoal.png`,
      })
    );
    gameBrain.togglePlayerTurn();
    screenController.setPlayerDisplay();
  } else if (/start-button/.test(clickedItem.id)) {
    screenController.clearGameBoard();
    gameBrain.setPlayerTurn("X");
    screenController.unhidePlayerDisplay();
    screenController.setPlayerDisplay();
  } else {
    console.log(e);
    return;
  }
});
