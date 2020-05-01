
const game = new Game(
    document.querySelector(".map"),
    document.querySelector(".score__score"),
    document.querySelector(".score__highscore"),
    document.querySelector(".game-over")
);
document.querySelector(".start").addEventListener("click",  (e) => {
    e.currentTarget.innerHTML = "Restart";
    game.start();
});