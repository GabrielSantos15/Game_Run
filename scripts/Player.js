class Person extends Sprite {
  constructor({
    width,
    height,
    position,
    direction,
    velocity,
    defend,
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
    this.defend = defend;
    this.inverter = inverter;
    this.sprites = sprites;
  }

  update() {
    this.velocity.x = 0;

    // gerencia os sprite
    if(this.defend){
      this.switchSprite("defend")
    }else if (this.velocity.y < 0) {
      this.switchSprite("jumpUp");
    } else if (this.velocity.y > 0) {
      this.switchSprite("jumpDown");
    } else if (this.direction.left || this.direction.right) {
      this.switchSprite("run");
    } else {
      this.switchSprite("idle");
    }

    // movimentação
    if (!this.defend) {
      if (this.direction.left) {
        this.velocity.x = -10;
        this.inverter = true;
      }
      if (this.direction.right) {
        this.velocity.x = +10;
        this.inverter = false;
      }
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

  // aplica os sprites
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
      case "jumpUp":
        if (this.imageSrc !== this.sprites.jumpUp.imageSrc) {
          this.imageSrc = this.sprites.jumpUp.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.jumpUp.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "jumpDown":
        if (this.imageSrc !== this.sprites.jumpDown.imageSrc) {
          this.imageSrc = this.sprites.jumpDown.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.jumpDown.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "defend":
        if (this.imageSrc !== this.sprites.defend.imageSrc) {
          this.imageSrc = this.sprites.defend.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.defend.frameMax;
          this.frameCurrent = 0;
        }
        break;
    }
  }
}
