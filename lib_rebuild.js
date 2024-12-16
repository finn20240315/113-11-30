class SmokeSystem {
  constructor(x, y) {
    this.x = x; // 定義一個 x 屬性
    this.y = y; // 定義一個 y 屬性
    this.vy = -2; // 定義一個 vx 屬性
    this.smokes = []; // 定義一個 smokes 屬性為陣列
  }
  update() {
    this.y += this.vy;
    /*
    this.x += this.vx; // 將 x 軸移動方向新增 vx 加速度
    if (this.x >= cvs.width || this.x <= 0) { // 如果 x 軸座標大於畫布或小於畫布
      this.vx = -1 * this.vx; // 則反轉 vx 的加速度
    }
    */
    this.smokes.push(
      // 將建立好的新的 Smoke 物件，推進 SmokeSystem 物件裡的 smokes 陣列屬性
      new Smoke(this.x, this.y) // 建立新的smoke物件
    );
    for (let i = 0; i < this.smokes.length; i++) {
      // 巡迴 SmokeSystem 物件裡的 smokes 陣列屬性
      let dead = this.smokes[i].update(); // 定義 SmokeSystem 物件裡的 smokes 陣列屬性的死亡條件：巡迴 this.smokes[i] 陣列中的每個 smoke 物件的 update(); 屬性
      if (dead === true) {
        // 如果 dead 條件成立
        this.smokes.splice(i, 1); // 將 smokes 陣列中第 i 個，拆分1個出來
        i--; // 同時將索引 i-1 個
      }
    }
  }
  draw() {
    for (let i = 0; i < this.smokes.length; i++) {
      this.smokes[i].draw();
    }
  }
}
class Smoke {
  // 類別定義一個 Smoke 煙霧系統
  constructor(x, y) {
    // 初始化建構式
    this.x = x; // 建立 x 屬性，x 軸初始的位置
    this.y = y; // 建立 y 屬性，y 軸初始的位置
    this.vx = Math.random() * 0.5 - 0.25; // -0.5~0.5 // 建立 vx 屬性，x 軸運動方向
    this.vy = Math.random() * 1.5 +0.5; // -1~-0.5 // 建立 vy 屬性，y 軸運動方向
    this.size = 20; // 建立 size 屬性，設定尺寸
    this.alpha = 1; // 建立 alpha 屬性，設定透明度為 1 不透明
  }
  update() {
    // 設定 Smoke 系統物件更新的條件
    this.x += this.vx; // x 軸加上 x 的加速度
    this.y += this.vy; // y 軸加上 y 的加速度
    this.size += 0.5; // 尺寸逐漸變大
    this.alpha -= 0.02; // 透明度逐漸減少
    return this.alpha <= 0.02; // 當透明度 <=0 的時候就 return true
  }
  draw() {
    ctx.globaAlpha = this.alpha; // 調整圖片透明度
    ctx.drawImage(
      img,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    // ctx.drawImage(圖片來源(圖片物件、影片物件、另一個canvas),圖片座標,圖片座標,圖片尺寸,圖片尺寸)
  }
}

class Rect {
  // 寫在r1、r2前面
  // 用建構式定義Rect物件，定義一個名為 Rect 的類別 (class)
  constructor(x, y) {
    // 定義類別(class)中的建構函式(constructor)
    this.x = x; // 建立物件中的 x 屬性
    this.y = y; // 建立物件中的 y 屬性
    // this.vx = vx; // 建立物件中的 vx 屬性
    // this.vy = vy; // 建立物件中的 vy 屬性
    this.vx = Math.random() * 10 - 5; // -5~5
    this.vy = Math.random() * 10 - 5; // -5~5
  }
  update() {
    // 定義一個更新的物件方法(Method、函式)
    this.x += this.vx; // x 軸方向隨機加 n 個
    this.y += this.vy; // y 軸方向隨機加 n 個
    this.vy += 0.01; // 在用隨機亂數產生的 y 軸移動方向中，再加上加速度 0.01，y方向會越跑越快
    return this.y > cvs.height; // 如果this.y > 畫布的高，就return true
  }
  draw() {
    // 定義一個繪圖的物件方法(Method、函式)
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}
