const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const gravity = 0.7;

// =================================== Informações do jogador ============================

const p1 = new Person({
  width: 45,
  height: 100,
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
  direction: {
    up: false,
    down: false,
    left: false,
    right: false,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  defend: false,
  imageSrc: "../images/sprites/Arrow/Idle.png",
  scale: 3,
  frameMax: 12,
  offset: { x: 137 * 3, y: 84 * 3 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: "../images/sprites/Arrow/Idle.png",
      frameMax: 12,
      image: new Image(),
    },
    run: {
      imageSrc: "../images/sprites/Arrow/Run.png",
      frameMax: 10,
    },
    jumpUp: {
      imageSrc: "../images/sprites/Arrow/Jump_up.png",
      frameMax: 3,
    },
    jumpDown: {
      imageSrc: "../images/sprites/Arrow/Jump_down.png",
      frameMax: 3,
    },
    defend: {
      imageSrc: "../images/sprites/Arrow/Defend.png",
      frameMax: 19,
    },
  },
});

// =================================== Gerenciador do jogo ============================

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  p1.update();
  p1.draw();
  requestAnimationFrame(game);
}
game();

// =================================== Teclado ============================

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      p1.direction.up = true;
      break;
    case "a":
      p1.direction.left = true;
      break;
    case "s":
      p1.direction.down = true;
      break;
    case "d":
      p1.direction.right = true;
      break;
    case "Shift":
      p1.defend = true;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      p1.direction.up = false;
      break;
    case "a":
      p1.direction.left = false;
      break;
    case "s":
      p1.direction.down = false;
      break;
    case "d":
      p1.direction.right = false;
      break;
    case "Shift":
      p1.defend = false;
      break;
  }
});
