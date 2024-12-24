class Person extends Sprite {
  constructor({
    width,
    height,
    position,
    direction,
    velocity,
    imageSrc,
    scale,
    frameMax,
    offset,
    inverter,
    sprites,
  }) {
    super({
      width,
      height,
      position,
      imageSrc,
      scale,
      frameMax,
      offset,
      inverter,
    });
    this.width = width;
    this.height = height;
    this.position = position;
    this.direction = direction;
    this.velocity = velocity;
    this.inverter = inverter;
    this.sprites = sprites;
  }

  update() {
    this.velocity.x = 0;

    // movimentação
    if (this.velocity.y < 0) {
      this.switchSprite("jump");
    } else if (this.direction.left || this.direction.right) {
      this.switchSprite("run");
    } else {
      this.switchSprite("idle");
    }

    if (this.direction.left) {
      this.velocity.x = -10;
      this.inverter = true;
    }
    if (this.direction.right) {
      this.velocity.x = +10;
      this.inverter = false;
    }

    // pulo
    if (this.direction.up && this.velocity.y == 0) {
      this.velocity.y = -15;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // gravidade
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }

    this.updateSprite();
    ctx.fillStyle = "#ff000074";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  switchSprite(sprite) {
    switch (sprite) {
      case "idle":
        if (this.imageSrc !== this.sprites.idle.imageSrc) {
          this.imageSrc = this.sprites.idle.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.idle.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "run":
        if (this.imageSrc !== this.sprites.run.imageSrc) {
          this.imageSrc = this.sprites.run.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.run.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "jump":
        if (this.imageSrc !== this.sprites.jump.imageSrc) {
          this.imageSrc = this.sprites.jump.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.jump.frameMax;
          this.frameCurrent = 0;
        }
        break;
    }
  }
}
