const FooterWithBasicCopyright = (() => {
  const footer = Object.assign(document.createElement("footer"), {
    innerText: `© Carlin Mitchell ${new Date().getFullYear()}`,
  });

  const githubLink = Object.assign(document.createElement("a"), {
    href: "https://github.com/carlin-mitchell/TicTacToe-TOP",
  });

  const githubIcon = Object.assign(document.createElement("img"), {
    src: "assets/github/github-mark-white.png",
  });

  githubLink.appendChild(githubIcon);
  footer.appendChild(githubLink);

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

const GameRow = (() => {
  const row = Object.assign(document.createElement("div"), {
    className: "game",
  });
  return row;
})();

const MainDiv = (() => {
  const main = document.createElement("main");
  main.appendChild(TitleRow);
  main.appendChild(GameRow);

  return main;
})();

// const title = document.querySelector(".title");
// title.appendChild(StartButton);

const body = document.querySelector("body");
body.appendChild(MainDiv);
body.appendChild(FooterWithBasicCopyright);
