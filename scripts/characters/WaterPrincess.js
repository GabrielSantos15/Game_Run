const WaterPrincess = {
  life: 100,
  width: 12,
  height: 30,
  position: {
    x: 192,
    y: 369.99,
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
  speed: 2,
  status: {
    atack: 0,
    defend: false,
    takeHit: false,
    death: false,
  },
  imageSrc: "./images/sprites/WaterPrincess/Idle.png",
  scale: 0.8,
  frameMax: 12,
  offset: { x: 110, y: 72 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: "./images/sprites/WaterPrincess/Idle.png",
      frameMax: 8,
      image: new Image(),
    },
    run: {
      imageSrc: "./images/sprites/WaterPrincess/Run.png",
      frameMax: 10,
    },
    slide: {
      imageSrc: "./images/sprites/WaterPrincess/Slide.png",
      frameMax: 8,
    },
    jumpUp: {
      imageSrc: "./images/sprites/WaterPrincess/Jump_up.png",
      frameMax: 3,
    },
    jumpDown: {
      imageSrc: "./images/sprites/WaterPrincess/Jump_down.png",
      frameMax: 3,
    },
    defend: {
      imageSrc: "./images/sprites/WaterPrincess/Defend.png",
      frameMax: 12,
    },
    takeHit: {
      imageSrc: "./images/sprites/WaterPrincess/takeHit.png",
      frameMax: 7,
    },
    death: {
      imageSrc: "./images/sprites/WaterPrincess/Death.png",
      frameMax: 16,
    },
    atack1: {
      imageSrc: "./images/sprites/WaterPrincess/Atack1.png",
      frameMax: 7,
      atackStart: 2,
      atackEnd: 4,
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
      imageSrc: "./images/sprites/WaterPrincess/Atack2.png",
      frameMax: 21,
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
      imageSrc: "./images/sprites/WaterPrincess/Atack3.png",
      frameMax: 25,
      atackStart: 6,
      atackEnd: 9,
      hitBox: {
        width: 170 / 4,
        height: 60 / 4,
        position: {
          x: -100 / 4,
          y: -90 / 4,
        },
      },
    },
    atack4: {
      imageSrc: "./images/sprites/WaterPrincess/AtackSp.png",
      frameMax: 32,
      atackStart: 10,
      atackEnd: 12,
      hitBox: {
        width: 170 / 4,
        height: 60 / 4,
        position: {
          x: -100 / 4,
          y: -90 / 4,
        },
      },
    },
  },
};
