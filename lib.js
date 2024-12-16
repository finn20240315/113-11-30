// 火箭飛上去尾巴會噴火
class SmokeSystem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.smokes = [];
  }
  update() {
    /* this.x += this.vx;
    if (this.x >= cvs.width || this.x <= 0) {
      this.vx = -1 * this.vx;
    }
    */
    this.y += this.vy;
    this.vy -= 0.02;
    this.smokes.push(new Smoke(this.x, this.y));
    for (let i = 0; i < this.smokes.length; i++) {
      let dead = this.smokes[i].update();
      if (dead) {
        this.smokes.splice(i, 1);
        i--;
      }
    }
  }
  draw() {
    let missileSize = 60;
    ctx.drawImage(
      imgs.missile,
      this.x - missileSize / 2,
      this.y - missileSize,
      missileSize,
      missileSize
    );
    for (let i = 0; i < this.smokes.length; i++) {
      this.smokes[i].draw();
    }
  }
}

class Smoke {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 0.5 - 0.25; // -0.5~0.5
    this.vy = Math.random() * 1.5 - 1; // -0.5~-2
    this.size = 20;
    this.alpha = 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.size += 0.05;
    this.alpha -= 0.02;
    return this.alpha <= 0.02;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
      imgs.fire,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }
}

class Rect {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 10 - 5; // 0.00000001~9.9999999-5 = -4.99999999~4.99999999
    this.vy = Math.random() * 10 - 5; // 0~1
    // this.vy =Math.random()*10-5; // 0.5~0.5
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy -= 0.02;
    // return 是否要消失
    return this.y > cvs.height;
  } // 如果y大於畫布的高 + x
  draw() {
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}
