class Person extends Sprite{
  constructor({ width, height, position, direction, velocity,imageSrc,scale,frameMax,offset }) {
    super({
        width,
        height,
        position,
        imageSrc,
        scale,
        frameMax,
        offset
      });
    this.width = width;
    this.height = height;
    this.position = position;
    this.direction = direction;
    this.velocity = velocity;
  }
  update() {

    this.velocity.x = 0;

    // movimentação 
    if (this.direction.left) {
        this.velocity.x = -5;
    }else if (this.direction.right) {
        this.velocity.x = +5;
    }

    // pulo
    if(this.direction.up && this.velocity.y == 0){
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

    this.updateSprite()
  }
}
