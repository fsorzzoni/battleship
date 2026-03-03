function generateKey([x, y]) {
   return "[" + x.toString() + ", " + y.toString() + "]";
}

function parseKey(key) {
   return JSON.parse(key);
}

function getRandomCoord() {
   const x = Math.floor(Math.random() * 10);
   const y = Math.floor(Math.random() * 10);
   return [x, y];
}

export { generateKey, parseKey, getRandomCoord }