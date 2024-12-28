let debugMode = false;

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

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol == 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 4,
        })
      );
    }
  });
});

const gravity = 0.1;

// =================================== Informações do background ========================
const background = new Sprite({
  width: canvas.width,
  height: canvas.height,
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/background/background.png",
});

const backgroundHeight = 432

// ================================== Informações da camera ==============================
const camera ={
  position:{
    x:0,
    y: -backgroundHeight + scaledCanvas.height
  }
}

// =================================== Informações do jogador ============================

const players = []

const p1 = new Person(WaterPrincess);
players.push(p1)
const p2 = new Person(Arrow);
players.push(p2)

// =================================== Gerenciador do jogo ============================

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.scale(4, 4);
  ctx.translate(camera.position.x,camera.position.y);
  background.draw();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  platformCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });

  players.map((player)=>{
    player.update();
    player.checkForHorizontalCanvasCollision()
    player.draw();

  })

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
      p1.speed = 2.5;
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
    case " ":
      p1.status.atack = 4;
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
      p1.velocity.x = 2;
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
window.addEventListener("keydown", (event) => {

  switch (event.key) {
    case "ArrowUp":
      p2.direction.up = true;
      break;
    case "ArrowLeft":
      p2.direction.left = true;
      break;
    case "ArrowDown":
      p2.direction.down = true;
      p2.speed = 2.5;
      break;
    case "ArrowRight":
      p2.direction.right = true;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      p2.direction.up = false;
      break;
    case "ArrowLeft":
      p2.direction.left = false;
      break;
    case "ArrowDown":
      p2.direction.down = false;
      p2.velocity.x = 2;
      break;
    case "ArrowRight":
      p2.direction.right = false;
      break;
  }
});

function dano() {
  p1.demage(10);
}
