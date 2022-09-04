const message = 'word';
const messageX = 20;
const messageY = 150;
var bubbles = [];
let animals = [];
let numbers = [];
let nombres = ['buho', 'gato', 'vaca', 'pez'];

let alto = window.screen.availHeight, ancho = window.screen.width;

function preload() {
  for (var i = 0; i < 4; i++) {
    numbers[i]= i;
    animals[i]= loadImage('images/animal' + i + '.png')
  }
}

function setup() {
  createCanvas(0.9*ancho, 0.9*alto);
  pos = 200;
  shnumbers = shuffle(numbers);
  textSize(32);
  r = floor(random(0, animals.length));
  index = 0;
  for (var i =0; i < 4; i++) {
    a = shnumbers[i]
    b = new Bubble(pos, alto/2, animals[a], nombres[a], a, index);
    bubbles.push(b)
    pos += 200;
  }
}

//function mousePressed() {
//  var r = floor(random(0, animals.length));
//  var b = new Bubble(mouseX, mouseY, animals[r])
//  bubbles.push(b);
//}

function keyPressed() {
  bubbles.splice(0,1);
}
function draw() {
  background(0);
  text(nombres[r], 500, 200);

  for (var i = 0; i < bubbles.length; i++) {
//    bubbles[i].move();
    bubbles[i].display();
    bubbles[i].intersects();
    text(bubbles[i].intersects(), 300, 100);
//    text(bubbles[i].puntaje(), 500, 100);
  }
//  if (bubbles[i].intersects()=r) {
  //  text();
//  }
}

function Bubble(x, y, img, pal, a, index) {
  this.x = x;
  this.y = y;
  this.img = img;
  this.pal = pal;
  this.a = a;
  this.index = index;

  this.display = function() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, 100, 100 );
    fill(0, 102, 153);
    text(this.pal , this.x-25, this.y-60);
//    stroke(255);
//    noFill();
//    ellipse(this.x, this.y, 24, 24);
  }

  this.intersects = function() {
    d = dist(this.x, this.y, mouseX, mouseY);
    e = this.pal
    if (d < 50 && mouseIsPressed) {
      text(e + this.a, 100, 100);
      return this.a;
    } //else {
    //  text('tubus vonyaet', 100, 100);
    //}

  }

  this.puntaje = function() {
    if (d < 50 && mouseIsPressed) {
      this.index += 1;
      return this.index;
    }
  }

  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
}
