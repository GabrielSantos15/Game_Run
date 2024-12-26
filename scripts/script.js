const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const gravity = 0.7;

// =================================== Informações do jogador ============================

const p1 = new Person({
  life : 100,
  width: 45,
  height: 130,
  standardWidth:45,
  standardHeight:130,
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
  hitBox: {
    width: 0,
    height: 0,
    position: {
      x: 0,
      y: 0,
    },
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
  speed: 7,
  status: {
    atack: 0,
    defend: false,
    takeHit: false,
    death: false
  },
  imageSrc: "./images/sprites/Arrow/Idle.png",
  scale: 3,
  frameMax: 12,
  offset: { x: 137 * 3, y: 84 * 3 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: "./images/sprites/Arrow/Idle.png",
      frameMax: 12,
      image: new Image(),
    },
    run: {
      imageSrc: "./images/sprites/Arrow/Run.png",
      frameMax: 10,
    },
    slide: {
      imageSrc: "./images/sprites/Arrow/Slide.png",
      frameMax: 13,
    },
    jumpUp: {
      imageSrc: "./images/sprites/Arrow/Jump_up.png",
      frameMax: 3,
    },
    jumpDown: {
      imageSrc: "./images/sprites/Arrow/Jump_down.png",
      frameMax: 3,
    },
    defend: {
      imageSrc: "./images/sprites/Arrow/Defend.png",
      frameMax: 19,
    },
    takeHit: {
      imageSrc: "./images/sprites/Arrow/takeHit.png",
      frameMax: 6,
    },
    death: {
      imageSrc: "./images/sprites/Arrow/Death.png",
      frameMax: 19,
    },
    atack1: {
      imageSrc: "./images/sprites/Arrow/Atack1.png",
      frameMax: 10,
      atackStart: 6,
      atackEnd: 9,
      hitBox: {
        width: 100,
        height: 30,
        position: {
          x: 120,
          y: 20,
        },
      },
    },
    atack2: {
      imageSrc: "./images/sprites/Arrow/Atack2.png",
      frameMax: 15,
      atackStart: 9,
      atackEnd: 11,
      hitBox: {
        width: 50,
        height: 50,
        position: {
          x: 70,
          y: 10,
        },
      },
    },
    atack3: {
      imageSrc: "./images/sprites/Arrow/Atack3.png",
      frameMax: 12,
      atackStart: 6,
      atackEnd: 9,
      hitBox: {
        width: 170,
        height: 60,
        position: {
          x: -100,
          y: -90,
        },
      },
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
  console.log(event.key);
  switch (event.key) {
    case "w":
      p1.direction.up = true;
      break;
    case "a":
      p1.direction.left = true;
      break;
    case "s":
      p1.direction.down = true;
      p1.speed = 10;
      break;
    case "d":
      p1.direction.right = true;
      break;
    case "Shift":
      p1.status.defend = true;
      break;
    case "e":
      p1.status.atack = 1;
      break;
    case "f":
      p1.status.atack = 2;
      break;
    case "r":
      p1.status.atack = 3;
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
      p1.speed = 7;
      break;
    case "d":
      p1.direction.right = false;
      break;
    case "Shift":
      p1.status.defend = false;
      break;
  }
});

function dano(){
  p1.demage(10)
}