// Variables
const gameboard = document.querySelector(".gameboard");
const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const startBtn = document.querySelector("#start-btn");
let score = 0;
let timeLeft = 30;
let gameStarted = false;
let gameInterval;

// Empieza Juego
function startGame() {
  gameStarted = true;
  startBtn.disabled = true;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
  startMoles();
}

// Termina Juego
function endGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  startBtn.disabled = false;
  Swal.fire({
    title: "¡ El juego ha terminado !",
    text: `Has obtenido ${score} puntos`,
    backdrop: 'static',
    allowOutsideClick: false,
    allowEscapeKey: true,
    confirmButtonText: "OK",
    customClass: {
      container: 'swal-no-select',  // custom class al contenedor elemento
    },
  });
}

// Topos
function startMoles() {
  let moleInterval = setInterval(() => {
    // random hole
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    // mole in the hole ?
    if (!hole.classList.contains("has-mole")) {
      // agrega la clase has-mole
      hole.classList.add("has-mole");
      // después de un random time interval, desaparece el topo
      setTimeout(() => {
        hole.classList.remove("has-mole");
      }, Math.random() * 2000 + 1000);
    }
  }, 1000);
}

// Whack a mole !
function whackMole(e) {
  if (!gameStarted) return;
  const hole = e.target.closest(".hole");
  if (!hole || !hole.classList.contains("has-mole")) return;
  hole.classList.remove("has-mole");
  score++;
  scoreDisplay.textContent = score;
}

// Event listeners
startBtn.addEventListener("click", startGame);
holes.forEach((hole) => {
  hole.addEventListener("click", whackMole);
});
