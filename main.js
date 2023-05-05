const updateFooterWithBasicCopyright = (() => {
  const footer = document.querySelector("footer");
  footer.innerText = `© Carlin Mitchell ${new Date().getFullYear()}`;

  const githubLink = Object.assign(document.createElement("a"), {
    href: "https://github.com/carlin-mitchell/TicTacToe-TOP",
  });

  const githubIcon = Object.assign(document.createElement("img"), {
    src: "assets/github/github-mark-white.png",
  });

  githubLink.appendChild(githubIcon);
  footer.appendChild(githubLink);
})();
