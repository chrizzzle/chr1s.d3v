const mapDom = document.querySelector(".map");

const map = new Map(15);
map.render(mapDom);
map.placeApple();

const snake = new Snake(3, map, [10, 10]);