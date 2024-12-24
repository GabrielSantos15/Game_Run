const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const gravity = 0.7;

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
  imageSrc: "../images/sprites/Player/IDLE.png",
  scale: 3,
  frameMax: 10,
  offset: { x: 42*3, y: 47*3 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: "../images/sprites/Player/IDLE.png",
      frameMax: 10,
      image: new Image(),
    },
    run: {
      imageSrc: "../images/sprites/Player/RUN.png",
      frameMax: 16,
    },
    jump:{
      imageSrc: "../images/sprites/Player/ATTACK.png",// Esse sprite não possui animação de pulo, então coloquei essa animação temporariamente
      frameMax: 7,
    }
  }
});

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  p1.update();
  p1.draw();
  requestAnimationFrame(game);
}
game();

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
  }
});
