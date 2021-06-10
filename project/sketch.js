let k;

function setup() {
  createCanvas(710, 400); //Канвас
  frameRate(1); //Анимация
  k = new KoxFractal(); //Неймспейсинг
}

function draw() {
  background(0); //Фон
  k.render(); //Сам фрактал
  k.nextLevel(); //Итерация
  if (k.getCount() > 5) { //Кол-во итераций
    k.restart(); //Рестрарт
  }
}
class KoxLine {
  constructor(a,b) {
    this.start = a.copy(); //Начало
    this.end = b.copy(); //К-ц
  }

  display() {
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  KoxA() {
    return this.start.copy();
  }

  KoxB() {
    let v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    v.add(this.start);
    return v;
  }

  KoxC() {
    let a = this.start.copy();
    let v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    a.add(v);
    v.rotate(-PI/3);
    a.add(v);
    return a;
  }
  KoxD() {
    let v = p5.Vector.sub(this.end, this.start);
    v.mult(2/3.0);
    v.add(this.start);
    return v;
  }
  KoxE() {
    return this.end.copy();
  }
}
class KoxFractal {
  constructor() {
    this.start = createVector(0,height-20);
    this.end = createVector(width,height-20);
    this.lines = [];
    this.count = 0;
    this.restart();
  }

  nextLevel() {
    this.lines = this.iterate(this.lines);
    this.count++;
  }

  restart() {
    this.count = 0;
    this.lines = [];
    this.lines.push(new KoxLine(this.start,this.end));
  }

  getCount() {
    return this.count;
  }
  render() {
    for(let i = 0; i < this.lines.length; i++) {
      this.lines[i].display();
    }
  }
  iterate(before) {
    let now = [];    // Create emtpy list
    for(let i = 0; i < this.lines.length; i++) {
      let l = this.lines[i];
      let a = l.KoxA();
      let b = l.KoxB();
      let c = l.KoxC();
      let d = l.KoxD();
      let e = l.KoxE();
      now.push(new KoxLine(a,b));
      now.push(new KoxLine(b,c));
      now.push(new KoxLine(c,d));
      now.push(new KoxLine(d,e));
    }
    return now;
  }
}
