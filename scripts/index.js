let debugMode = true;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// canvas.width = 1024;
// canvas.height = 576;
canvas.width = innerWidth;
canvas.height = innerHeight;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}
const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol == 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol == 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const gravity = 0.5;

// =================================== Informações do background =============
const background = new Sprite({
  width: canvas.width,
  height: canvas.height,
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/background/background.png",
});

// =================================== Informações do jogador ============================
const p1 = new Person({
  life: 100,
  width: 12,
  height: 30,
  position: {
    x: 250,
    y: 0,
  },
  collisionBlocks,
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
  speed: 3,
  status: {
    atack: 0,
    defend: false,
    takeHit: false,
    death: false,
  },
  imageSrc: "./images/sprites/Arrow/Idle.png",
  scale: .7,
  frameMax: 12,
  offset: { x: 95 , y: 59 },
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
        width: 25,
        height: 7,
        position: {
          x: 30,
          y: 5,
        },
      },
    },
    atack2: {
      imageSrc: "./images/sprites/Arrow/Atack2.png",
      frameMax: 15,
      atackStart: 9,
      atackEnd: 11,
      hitBox: {
        width: 15,
        height: 15,
        position: {
          x: 18,
          y: 3,
        },
      },
    },
    atack3: {
      imageSrc: "./images/sprites/Arrow/Atack3.png",
      frameMax: 12,
      atackStart: 6,
      atackEnd: 9,
      hitBox: {
        width: 170/4,
        height: 60/4,
        position: {
          x: -100/4,
          y: -90/4,
        },
      },
    },
  },
});

// =================================== Gerenciador do jogo ============================

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.scale(4, 4);
  ctx.translate(0, -background.image.height + scaledCanvas.height);
  background.draw();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  p1.update();
  p1.draw();
  ctx.restore();

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
      p1.speed = 4;
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
      p1.velocity.x = 3;
      break;
    case "d":
      p1.direction.right = false;
      break;
    case "Shift":
      p1.status.defend = false;
      break;
    case ".":
      debugMode ? debugMode = false : debugMode = true
      break;
  }
});

function dano() {
  p1.demage(10);
}
