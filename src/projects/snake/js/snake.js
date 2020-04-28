class Snake {
    constructor(size, map, startField) {
        this._size = size;
        this._startField = startField;
    }

    getNextLeftField(field) {

    }
    getNextRightField(field) {}
    getNextTopField(field) {}
    getNextBottomField(field) {}

    generateSnake() {

    }

    renderSnake() {
        const snakePartDom = document.createElement("div");
        snakePartDom.classList.add("snake__part");
    }
}