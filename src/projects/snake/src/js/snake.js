class Snake {
    constructor(size, map, startField) {
        this._size = size;
        this._map = map;
        this._mapFields = map.getFields();
        this._originalHeadField = startField;
        this._headField = startField;
        this._directions = {
            UP: "UP",
            DOWN: "DOWN",
            LEFT: "LEFT",
            RIGHT: "RIGHT"
        };
        this._direction = this._directions.RIGHT;
        this.calcInitialSnakeFields();
    }

    reset() {
        if (this._interval) {
            window.clearInterval(this._interval);
        }
        this.destroySnake();
        this._direction = this._directions.RIGHT;
        this._headField = this._originalHeadField;
        this.calcInitialSnakeFields();
    }

    startMove() {
        this._interval = window.setInterval(this.step.bind(this), 100);
    }

    handleClick(coordinates) {
        const elementCoordinates = document.querySelector(".snake--first").getBoundingClientRect();
        switch(this._direction) {
            case this._directions.UP:
            case this._directions.DOWN:
                if (elementCoordinates.x > coordinates[0]) {
                    this.changeDirection({ key: "A" });
                } else {
                    this.changeDirection({ key: "D" });
                }
                return;

            case this._directions.RIGHT:
            case this._directions.LEFT:
                if (elementCoordinates.x > coordinates[1]) {
                    this.changeDirection({ key: "W" });
                } else {
                    this.changeDirection({ key: "S" });
                }
                return;
        }
    }

    getFields() {
        return this._snakeFields;
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
    calcNextTailField() {
        const lastField = this._snakeFields[this._snakeFields.length-1];
        switch (this._direction) {
            case this._directions.RIGHT:
                return this.translateField([lastField[0], lastField[1] - 1]);
            case this._directions.LEFT:
                return this.translateField([lastField[0], lastField[1] + 1]);
            case this._directions.UP:
                return this.translateField([lastField[0] + 1, lastField[1]]);
            case this._directions.DOWN:
                return this.translateField([lastField[0] - 1, lastField[1]]);
        }
    }
    checkIfCollision() {
        const found = this._snakeFields.find( (snakeField) => {
            return snakeField[0] === this._headField[0] &&
                snakeField[1] === this._headField[1];
        });

        if (found) {
            document.dispatchEvent(new Event('snake:dead'));
        }
    }

    stop() {
        window.clearInterval(this._interval);
    }

    checkIfApple() {
        if (this._map.isAppleField(this._headField)) {
            this.addSnakeField();
            document.dispatchEvent(new Event('snake:apple'));
        }
    }

    addSnakeField() {
        const nextField = this.calcNextTailField();
        this._snakeFields.push(nextField);
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

    destroySnake() {
        const fields = document.querySelectorAll(".snake");

        for (let i = 0; i < fields.length; i++) {
            fields[i].classList.remove("snake");
            fields[i].classList.remove("snake--first");
            fields[i].classList.remove("snake--last");
            fields[i].classList.remove("snake--up");
            fields[i].classList.remove("snake--down");
            fields[i].classList.remove("snake--left");
            fields[i].classList.remove("snake--right");
        }
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