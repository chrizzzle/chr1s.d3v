const game = new Game();
document.querySelector(".start").addEventListener("click",  (e) => {
    e.currentTarget.innerHTML = "Restart";
    game.start();
});