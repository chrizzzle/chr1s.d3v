const mapDom = document.querySelector(".map");

const map = new Map(49);
map.render(mapDom);

const snake = new Snake(3, map, [24, 24]);