class Map {
    constructor(size) {
        this._size = size;
        this._fields = [];
        this._fieldTypes = {
            field: "1",
            apple: "2"
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

    placeApple() {
        //@TODO dont place apple where snake is
        const y = Math.round(Math.random() * (this._size-1));
        const x = Math.round(Math.random() * (this._size-1));

        this.generateMap();

        this._fields[y][x] = this._fieldTypes.apple;
        this.renderApple(y, x);
    }

    removeApple() {

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
        console.log(`.field-${y}-${x}`);
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