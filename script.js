// Game variables
const gameboard = document.querySelector(".gameboard");
const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const startBtn = document.querySelector("#start-btn");
let score = 0;
let timeLeft = 30;
let gameStarted = false;
let gameInterval;

// Start the game
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

// End the game
function endGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  startBtn.disabled = false;
  Swal.fire({
    title: "Game Over !",
    text: `Your score is  ${score}`,
    backdrop: 'static',
    allowOutsideClick: false,
    allowEscapeKey: true,
    confirmButtonText: "OK",
    customClass: {
      container: 'swal-no-select',  // Add a custom class to the container element
    },
  });
}

// Start the moles
function startMoles() {
  let moleInterval = setInterval(() => {
    // Pick a random hole
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    // Check if there's already a mole in the hole
    if (!hole.classList.contains("has-mole")) {
      // Add a mole to the hole
      hole.classList.add("has-mole");
      // Remove the mole after a random time interval
      setTimeout(() => {
        hole.classList.remove("has-mole");
      }, Math.random() * 2000 + 1000);
    }
  }, 1000);
}

// Whack a mole
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
