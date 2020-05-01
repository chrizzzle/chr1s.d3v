class Game {
    constructor(
        mapElement,
        scoreElement,
        highScoreElement,
        gameOverElement,
        startElement,
        startButtonElement
    ) {
        this._score = 0;
        this._scoreElement = scoreElement;
        this._highscoreElement = highScoreElement;
        this._mapElement = mapElement;
        this._gameOverElement = gameOverElement;
        this._startElement = startElement;
        this._startButtonElement = startButtonElement;

        this._map = new SnakeMap(15);
        this._map.render(this._mapElement);
        this._map.placeApple();
        this._snake = new Snake(3, this._map, [10, 10]);
        this.renderScore();

        document.addEventListener("snake:dead", this.gameOver.bind(this));
        document.addEventListener("snake:apple", this.foundApple.bind(this));
        document.addEventListener("keydown", this.changeDirection.bind(this));

        this.clickHandler = this.handleClick.bind(this);
    }
    handleClick(e) {
        const x = e.clientX;
        const y = e.clientY;
        this._snake.handleClick([x, y]);
    }
    changeDirection(e) {
        this._snake.changeDirection(e);
    }
    reset() {
        this._mapElement.removeEventListener("click", this.clickHandler);
        this._score = 0;
        this.renderScore();
        this.hideGameOver();
        this._snake.reset();
    }

    start() {
        this._mapElement.addEventListener("click", this.clickHandler);
        this.hideStartElement();
        this._snake.startMove();
        this.hideStartButton();
    }
    gameOver() {
        this._snake.stop();
        this.renderGameOver();
        this.showStartButton();
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
    hideStartButton() {
        this._startButtonElement.innerHTML = "Restart";
        this._startButtonElement.classList.add("start-button--hidden");
    }
    showStartButton() {
        this._startButtonElement.classList.remove("start-button--hidden");

    }
    renderHighscore() {
        this._highscoreElement.innerHTML = localStorage.getItem("snake:highscore") || "0";
    }
    hideStartElement() {
        this._startElement.classList.add("start--hidden");
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