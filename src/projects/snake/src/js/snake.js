class Snake {
    constructor(size, map, startField) {
        this._size = size;
        this._map = map;
        this._mapFields = map.getFields();
        this._headField = startField;
        this._directions = {
            UP: "UP",
            DOWN: "DOWN",
            LEFT: "LEFT",
            RIGHT: "RIGHT"
        };
        this._direction = this._directions.UP;
        this.calcInitialSnakeFields();
        this._interval = window.setInterval(this.step.bind(this), 100);

        document.addEventListener("keydown", this.changeDirection.bind(this))
    }

    changeDirection(event) {
        if (this._directionChanged) {
            return;
        }

        const key = event.key || event.keyCode;
        switch (key.toUpperCase()) {
            case "W":
                if (this._direction !== this._directions.DOWN && this._direction !== this._directions.UP) {
                    this._direction = this._directions.UP;
                    this._directionChanged = true;
                }
                break;
            case "S":
                if (this._direction !== this._directions.UP && this._direction !== this._directions.DOWN) {
                    this._direction = this._directions.DOWN;
                    this._directionChanged = true;
                }
                break;
            case "A":
                if (this._direction !== this._directions.RIGHT && this._direction !== this._directions.LEFT) {
                    this._direction = this._directions.LEFT;
                    this._directionChanged = true;
                }
                break;
            case "D":
                if (this._direction !== this._directions.LEFT && this._direction !== this._directions.RIGHT) {
                    this._direction = this._directions.RIGHT;
                    this._directionChanged = true;
                }
                break;
        }
    }

    translateField(field) {
        if (field[0] > this._mapFields.length - 1) {
            field[0] = 0;
        }
        if (field[1] > this._mapFields.length - 1) {
            field[1] = 0;
        }
        if (field[0] < 0) {
            field[0] = this._mapFields.length - 1;
        }
        if (field[1] < 0) {
            field[1] = this._mapFields.length - 1;
        }
        return field;
    }

    step() {
        this.calcNextHeadField();
        this.checkIfCollision();
        this.checkIfApple();
        this.calcSnakeFields();
    }

    calcNextHeadField() {
        switch (this._direction) {
            case this._directions.RIGHT:
                this._headField = this.translateField([this._headField[0], this._headField[1] + 1]);
                break;
            case this._directions.LEFT:
                this._headField = this.translateField([this._headField[0], this._headField[1] - 1]);
                break;
            case this._directions.UP:
                this._headField = this.translateField([this._headField[0] - 1, this._headField[1]]);
                break;
            case this._directions.DOWN:
                this._headField = this.translateField([this._headField[0] + 1, this._headField[1]]);
                break;
        }
    }
    checkIfCollision() {
        const found = this._snakeFields.find( (snakeField) => {
            return snakeField[0] === this._headField[0] &&
                snakeField[1] === this._headField[1];
        });

        if (found) {
            window.clearInterval(this._interval);
        }
    }

    checkIfApple() {
        if (this._map.getFields()[this._headField[0]][this._headField[1]] === "2") {
            this.addSnakeField();
            this._map.placeApple();
        }
    }

    addSnakeField() {
        this._snakeFields.unshift(this._headField);
    }

    calcSnakeFields() {
        this._lastField = this._snakeFields.pop();
        this._snakeFields.unshift(this._headField);
        this.renderSnake();
    }

    calcInitialSnakeFields() {
        this._snakeFields = [
            this._headField,
            this.translateField([this._headField[0], this._headField[1] - 1]),
            this.translateField([this._headField[0], this._headField[1] - 2])
        ];
        this.renderSnake();
    }

    renderSnake() {
        if (this._lastField) {
            document.querySelector(
                `.field-${this._lastField[0]}-${this._lastField[1]}`
            ).classList.remove("snake");
        }

        for (let i = 0; i < this._snakeFields.length; i++) {
            document.querySelector(
                `.field-${this._snakeFields[i][0]}-${this._snakeFields[i][1]}`
            ).classList.add("snake");
        }

        this._directionChanged = false;
    }
}