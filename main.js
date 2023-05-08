const gameBrain = (() => {
  const gameBoard = new Array(9).fill(null, 0, 9);

  return { gameBoard };
})();
console.log(gameBrain.gameBoard);

const screenController = (() => {
  function setInitialView() {
    const body = document.querySelector("body");
    body.appendChild(MainDiv);
    body.appendChild(FooterWithBasicCopyright);
  }

  return { setInitialView };
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

const StartButton = (() => {
  const startingText = "Tic Tac Toe";
  const button = Object.assign(document.createElement("div"), {
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

  for (i = 0; i < 9; i++) {
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
  main.appendChild(GameRow);

  return main;
})();

screenController.setInitialView();
