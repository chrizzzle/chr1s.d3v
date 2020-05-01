class Game {
    constructor() {
        this._score = 0;
        this._scoreElement = document.querySelector(".score__score");
        this._highscoreElement = document.querySelector(".score__highscore");
        this._mapElement = document.querySelector(".map");
        this._gameOverElement = document.querySelector(".game-over");
        document.addEventListener("snake:dead", this.gameOver.bind(this));
        document.addEventListener("snake:apple", this.foundApple.bind(this));

        this._map = new Map(15);
        this._map.render(this._mapElement);
        this._map.placeApple();
        this._snake = new Snake(3, this._map, [10, 10]);
        this.renderScore();
    }
    start() {
        this._score = 0;
        this.renderScore();
        this.hideGameOver();
        this._snake.reset();
        this._snake.startMove();
    }
    gameOver() {
        this._snake.stop();
        this.renderGameOver();
    }
    foundApple() {
        this._map.placeApple(this._snake.getFields());
        this.increaseScore();
    }
    increaseScore(){
        this._score++;
        this.saveHighscore();
        this.renderScore();
    }
    renderScore() {
        this._scoreElement.innerHTML = this._score;
        this.renderHighscore();
    }
    renderGameOver() {
        this._gameOverElement.classList.remove("game-over--hidden");
    }
    hideGameOver() {
        this._gameOverElement.classList.add("game-over--hidden");
    }
    renderHighscore() {
        this._highscoreElement.innerHTML = localStorage.getItem("snake:highscore") || "0";

    }
    saveHighscore() {
        if (window.localStorage) {
            let existingHighscore = localStorage.getItem("snake:highscore");
            if (existingHighscore) {
                existingHighscore = parseInt(existingHighscore);

                if (this._score > existingHighscore) {
                    localStorage.setItem("snake:highscore", this._score);
                }
            } else {
                localStorage.setItem("snake:highscore", this._score);
            }
        }
    }
}