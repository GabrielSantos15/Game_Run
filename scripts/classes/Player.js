class Person extends Sprite {
  constructor({
    life,
    width,
    height,
    position,
    collisionBlocks,
    hitBox,
    direction,
    velocity,
    speed,
    status,
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
    this.life = life;
    this.width = width;
    this.height = height;
    this.position = position;
    this.collisionBlocks = collisionBlocks;
    this.hitBox = hitBox;
    this.direction = direction;
    this.velocity = velocity;
    this.speed = speed;
    this.status = status;
    this.inverter = inverter;
    this.sprites = sprites;
  }

  update() {
    if (this.life <= 0) this.status.death = true;
    
    // gerencia os sprite
    if (this.status.death) {
      this.switchSprite("death");
    } else if (this.status.takeHit) {
      this.switchSprite("takeHit");
    } else if (this.status.atack !== 0) {
      this.switchSprite("atack" + this.status.atack);
    } else if (this.status.defend) {
      this.switchSprite("defend");
    } else if (this.velocity.y < 0) {
      this.switchSprite("jumpUp");
    } else if (this.velocity.y > 0) {
      this.switchSprite("jumpDown");
    } else if (this.direction.down) {
      this.switchSprite("slide");
    } else if (this.direction.left || this.direction.right) {
      this.switchSprite("run");
    } else {
      this.switchSprite("idle");
    }
    
    this.velocity.x = 0;
    // movimentação
    if (!(this.status.atack !== 0 || this.status.defend || this.status.death)) {
      if (this.direction.left) {
        this.velocity.x = -this.speed;
        this.inverter = true;
      }
      if (this.direction.right) {
        this.velocity.x = this.speed;
        this.inverter = false;
      }
    }

    // pulo
    if (this.direction.up && this.velocity.y == 0) {
      this.velocity.y = -7.5;
    }

    this.position.x += this.velocity.x;

    this.checkForHorizontalCollisions()
    this.applyGravity();
    this.checkForVerticalCollisions();
    
    console.log(this.velocity.y)
    this.updateSprite();

    // desenha caixas de colisão

    if (debugMode) {
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(
        this.hitBox.position.x,
        this.hitBox.position.y,
        this.hitBox.width,
        this.hitBox.height
      );
    }
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if(this.velocity.x > 0){
          this.velocity.x = 0
          this.position.x = collisionBlock.position.x - this.width- .01
          break
        }
        if(this.velocity.x < 0){
          this.velocity.x = 0
          this.position.x = collisionBlock.position.x + collisionBlock.width + .01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if(this.velocity.y > 0){
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y - this.height - .01
          break
        }
        if(this.velocity.y < 0){
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y + collisionBlock.height + .1
          break
        }
      }
    }
  }

  demage(hitPower) {
    this.status.takeHit = true;
    this.life -= hitPower;
  }

  // aplica os sprites
  switchSprite(sprite) {
    if (this.imageSrc !== this.sprites[sprite].imageSrc) {
      this.imageSrc = this.sprites[sprite].imageSrc;
      this.image.src = this.imageSrc;
      this.frameMax = this.sprites[sprite].frameMax;
      this.frameCurrent = 0;
    }
    if (sprite === "death" && this.frameCurrent === this.frameMax - 1) {
      window.location.reload();
    }
    if (sprite === "takeHit" && this.frameCurrent === this.frameMax - 1) {
      this.status.takeHit = false;
    }
    switch (sprite) {
      case "atack1":
        if (this.imageSrc !== this.sprites.atack1.imageSrc) {
          this.imageSrc = this.sprites.atack1.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.atack1.frameMax;
          this.frameCurrent = 0;
        } else if (this.frameCurrent == this.frameMax - 1) {
          this.status.atack = 0;
        } else if (this.frameCurrent == this.sprites.atack1.atackStart) {
          // adiciona a hitbox
          this.hitBox.width = this.sprites.atack1.hitBox.width;
          this.hitBox.height = this.sprites.atack1.hitBox.height;

          if (!this.inverter) {
            this.hitBox.position.x =
              this.position.x +
              this.width +
              this.sprites.atack1.hitBox.position.x;
          } else {
            this.hitBox.position.x =
              this.position.x -
              this.sprites.atack1.hitBox.width -
              this.sprites.atack1.hitBox.position.x;
          }
          this.hitBox.position.y =
            this.position.y + this.sprites.atack1.hitBox.position.y;
        } else if (this.frameCurrent == this.sprites.atack1.atackEnd - 1) {
          // remove a hitbox
          this.hitBox.width = 0;
          this.hitBox.height = 0;
        }
        break;
      case "atack2":
        if (this.imageSrc !== this.sprites.atack2.imageSrc) {
          this.imageSrc = this.sprites.atack2.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.atack2.frameMax;
          this.frameCurrent = 0;
        } else if (this.frameCurrent == this.frameMax - 1) {
          this.status.atack = 0;
        } else if (this.frameCurrent == this.sprites.atack2.atackStart) {
          // adiciona a hitbox
          this.hitBox.width = this.sprites.atack2.hitBox.width;
          this.hitBox.height = this.sprites.atack2.hitBox.height;

          if (!this.inverter) {
            this.hitBox.position.x =
              this.position.x +
              this.width +
              this.sprites.atack2.hitBox.position.x;
          } else {
            this.hitBox.position.x =
              this.position.x -
              this.sprites.atack2.hitBox.width -
              this.sprites.atack2.hitBox.position.x;
          }
          this.hitBox.position.y =
            this.position.y + this.sprites.atack2.hitBox.position.y;
        } else if (this.frameCurrent == this.sprites.atack2.atackEnd - 1) {
          // remove a hitbox
          this.hitBox.width = 0;
          this.hitBox.height = 0;
        }
        break;
      case "atack3":
        if (this.imageSrc !== this.sprites.atack3.imageSrc) {
          this.imageSrc = this.sprites.atack3.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.atack3.frameMax;
          this.frameCurrent = 0;
        } else if (this.frameCurrent == this.frameMax - 1) {
          this.status.atack = 0;
        } else if (this.frameCurrent == this.sprites.atack3.atackStart) {
          // adiciona a hitbox
          this.hitBox.width = this.sprites.atack3.hitBox.width;
          this.hitBox.height = this.sprites.atack3.hitBox.height;

          if (!this.inverter) {
            this.hitBox.position.x =
              this.position.x +
              this.width +
              this.sprites.atack3.hitBox.position.x;
          } else {
            this.hitBox.position.x =
              this.position.x -
              this.sprites.atack3.hitBox.width -
              this.sprites.atack3.hitBox.position.x;
          }
          this.hitBox.position.y =
            this.position.y + this.sprites.atack3.hitBox.position.y;
        } else if (this.frameCurrent == this.sprites.atack3.atackEnd - 1) {
          // remove a hitbox
          this.hitBox.width = 0;
          this.hitBox.height = 0;
        }
        break;
    }
  }
}
