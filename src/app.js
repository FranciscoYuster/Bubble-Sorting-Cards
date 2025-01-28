// Función para obtener el valor de la carta
const getVal = num =>
  num == 11 ? "J" : num == 12 ? "Q" : num == 13 ? "K" : num == 14 ? "A" : num;

// Función para generar un mazo aleatorio de cartas
const getDeck = len => {
  const suites = ["club", "diamond", "heart", "spade"];
  const getRandomcard = () => ({
    num: Math.floor(Math.random() * 14) + 1,
    suit: suites[Math.floor(Math.random() * 4)]
  });

  let deck = [];
  for (let i = 0; i < len; i++) deck.push(getRandomcard());
  return deck;
};

// Variables globales
var log = [];
let deck = [];

// Implementación del algoritmo Bubble Sort
const bubbleSort = arr => {
  let wall = arr.length - 1; // Iniciamos la pared al final del arreglo
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      // Comparar posiciones adyacentes, si el derecho es menor, intercambiamos
      if (arr[index].num > arr[index + 1].num) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;

        // Registrar el estado del mazo en el log
        log.push(arr.slice(0));
      }
      index++;
    }
    wall--; // Reducir la pared para optimización
  }
  return arr;
};

// Función para renderizar cada carta como un div
const renderCard = c =>
  `<div class="card ${c.suit}"><span>${getVal(c.num)}</span></div>`;

// Evento para generar el mazo
document.querySelector("#draw").addEventListener("click", () => {
  deck = getDeck(parseInt(document.querySelector("#amount").value));
  document.querySelector(".deck.unsorted").innerHTML = deck
    .map(c => renderCard(c))
    .join("");
  document.querySelector(".solution-log").innerHTML = "";
  log = []; // Reiniciar el log
});

document.querySelector("#sort").addEventListener("click", () => {
  bubbleSort(deck);
  document.querySelector(".solution-log").innerHTML = log
    .map(
      (iter, i) =>
        `<li><i>${i + 1}</i><div class="deck">${iter
          .map(c => renderCard(c))
          .join("")}</div></li>`
    )
    .join("");
});
