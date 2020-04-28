class Map {
    constructor(size) {
        this._size = size;
        this._fields = [];
        this._fieldTypes = {
            field: "1",
            star: "2"
        };
        this.generateMap();
    }

    generateMap() {
        for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++) {
                if (!this._fields[i]) {this._fields[i] = [];}
                this._fields[i].push({[j]: this._fieldTypes.field});
            }
        }
    }

    render(element) {
        let fieldDom;
        for (let i = 0; i < this._fields.length; i++) {
            for (let j = 0; j < this._fields[i].length; j++) {
                fieldDom = document.createElement("div");
                fieldDom.style.width = "10px";
                fieldDom.style.height = "10px";
                element.style.width = `${this._size * 10}px`;
                element.style.height = `${this._size * 10}px`;
                element.style.display = "flex";
                element.style.flexWrap = "wrap";
                element.appendChild(fieldDom);
            }
        }
    }
}