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

        const key = event.key;
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
        let snakeDomField, lastField;
        if (this._lastField) {
            lastField = document.querySelector(
                `.field-${this._lastField[0]}-${this._lastField[1]}`
            );
            lastField.classList.remove("snake");
            lastField.classList.remove("snake--first");
            lastField.classList.remove("snake--last");
            lastField.classList.remove("snake--up");
            lastField.classList.remove("snake--down");
            lastField.classList.remove("snake--left");
            lastField.classList.remove("snake--right");
        }

        for (let i = 0; i < this._snakeFields.length; i++) {
            snakeDomField = document.querySelector(
                `.field-${this._snakeFields[i][0]}-${this._snakeFields[i][1]}`
            );
            snakeDomField.classList.add("snake");

            snakeDomField.classList.remove("snake--first");
            snakeDomField.classList.remove("snake--last");
            snakeDomField.classList.remove("snake--up");
            snakeDomField.classList.remove("snake--down");
            snakeDomField.classList.remove("snake--left");
            snakeDomField.classList.remove("snake--right");

            if (i === 0) {
                snakeDomField.classList.add(`snake--first`);
                snakeDomField.classList.add(`snake--${this._direction.toLowerCase()}`);
            }
            if (i === this._snakeFields.length -1) {
                snakeDomField.classList.add(`snake--last`);
                snakeDomField.classList.add(`snake--${this._direction.toLowerCase()}`);
            }
        }

        this._directionChanged = false;
    }
}