class Person extends Sprite {
  constructor({
    life,
    width,
    height,
    position,
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
    this.hitBox = hitBox;
    this.direction = direction;
    this.velocity = velocity;
    this.speed = speed;
    this.status = status;
    this.inverter = inverter;
    this.sprites = sprites;
  }

  update() {
    this.velocity.x = 0;
    if (this.life <= 0) this.status.death = true;

    // gerencia os sprite
    if (this.status.death) {
      this.switchSprite("death");
    } else if(this.status.takeHit){
      this.switchSprite("takeHit");
    }else if (this.status.atack !== 0) {
      this.switchSprite("atack" + this.status.atack);
    } else if (this.status.defend) {
      this.switchSprite("defend");
    } else if (this.velocity.y < 0) {
      this.switchSprite("jumpUp");
    } else if (this.velocity.y > 0) {
      this.switchSprite("jumpDown");
    }else if(this.direction.down){
      this.switchSprite("slide");
    } else if (this.direction.left || this.direction.right) {
      this.switchSprite("run");
    } else {
      this.switchSprite("idle");
    }

    // movimentação
    if (!(this.status.atack !== 0 || this.status.defend)) {
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

    // desenha caixas de colisão
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(
      this.hitBox.position.x,
      this.hitBox.position.y,
      this.hitBox.width,
      this.hitBox.height
    );
    document.querySelector("#life").innerHTML = this.life
  }

  demage(hitPower) {
    this.status.takeHit = true;
    this.life -= hitPower;
  }

  // aplica os sprites
  switchSprite(sprite) {
    console.log(this.imageSrc);
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
      case "slide":
        if (this.imageSrc !== this.sprites.slide.imageSrc) {
          this.imageSrc = this.sprites.slide.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.slide.frameMax;
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
      case "death":
        if (this.imageSrc !== this.sprites.death.imageSrc) {
          this.imageSrc = this.sprites.death.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.death.frameMax;
          this.frameCurrent = 0;
        }else if(this.frameCurrent == this.frameMax-1){

          window.location.reload();
        }
        break;
      case "takeHit":
        if (this.imageSrc !== this.sprites.takeHit.imageSrc) {
          this.imageSrc = this.sprites.takeHit.imageSrc;
          this.image.src = this.imageSrc;
          this.frameMax = this.sprites.takeHit.frameMax;
          this.frameCurrent = 0;
        }else if(this.frameCurrent == this.frameMax-1){
          this.status.takeHit = false
        }
        break;
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
