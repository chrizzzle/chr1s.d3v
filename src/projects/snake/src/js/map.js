class Map {
    constructor(size) {
        this._size = size;
        this._fields = [];
        this._fieldTypes = {
            field: "1",
            apple: "2",
            blocked: "3"
        };
        this.generateMap();
    }

    getFields() {
        return this._fields;
    }

    generateMap() {
        for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++) {
                if (!this._fields[i]) {this._fields[i] = [];}
                this._fields[i][j] = this._fieldTypes.field;
            }
        }
    }

    isAppleField(field) {
        return this.getFields()[field[0]][field[1]] === "2";
    }

    placeApple(snakeFields) {
        let snakeField, x, y;
        snakeFields = snakeFields || [];

        for (let i = 0; i < snakeFields.length; i++) {
            y = snakeFields[i][0],
            x = snakeFields[i][1]
            this._fields[y][x] = this._fieldTypes.blocked;
        }

        let allowedFields = []

        for (let i = 0; i < this._fields.length; i++) {
            for (let j = 0; j < this._fields[i].length; j++) {
                if (this._fields[i][j] !== this._fieldTypes.blocked) {
                    allowedFields.push([i, j]);
                }
            }
        }

        const rnd = Math.round(Math.random() * (allowedFields.length-1));
        const rndField = allowedFields[rnd];
        this.generateMap();
        this._fields[rndField[0]][rndField[1]] = this._fieldTypes.apple;
        this.renderApple(rndField[0], rndField[1]);
    }

    renderApple(y, x) {
        const existing = document.querySelector(".apple");
        if (existing) {
            existing.remove();
        }
        const appleDom = document.createElement("img");
        appleDom.setAttribute("src", "img/mario/apple.svg");
        appleDom.classList.add("apple");
        document.querySelector(`.field-${y}-${x}`).appendChild(appleDom);
    }

    render(element) {
        let fieldDom, rowDom, fieldDomInner;
        for (let i = 0; i < this._fields.length; i++) {
            rowDom = document.createElement("div");
            rowDom.classList.add("row");

            for (let j = 0; j < this._fields[i].length; j++) {
                fieldDomInner = document.createElement("div");
                fieldDomInner.classList.add(`field__inner`);
                fieldDom = document.createElement("div");
                fieldDom.classList.add(`field`);
                fieldDom.classList.add(`field-${i}-${j}`);
                fieldDom.appendChild(fieldDomInner);
                rowDom.appendChild(fieldDom);
            }
            element.appendChild(rowDom);
        }
    }
}