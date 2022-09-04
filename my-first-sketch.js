const message = 'word';
const messageX = 20;
const messageY = 150;
const bolas = 5;  //cantidad de bolas que salen
var bubbles = [];
let animals = [];
let sonidos = []
//var sonido;
let numbers = [];
let nombres = ['buho', 'gato', 'vaca', 'pez', 'perro', 'elefante', 'jirafa', 'gorila', 'león' ];

let alto = window.screen.availHeight, ancho = window.screen.width;

//function preload() {
  //bg = loadImage('blob/main/images/background.png');
//  ship = loadImage('https://raw.githubusercontent.com/espanolnetwork/AlienLanguageGame/main/images/Ship.png');
//  abducte = loadSound('https://raw.githubusercontent.com/espanolnetwork/AlienLanguageGame/main/audios/abducte.m4a')
//  for (var i = 0; i < nombres.length; i++) {
//    numbers[i]= i;
//    animals[i]= loadImage('https://raw.githubusercontent.com/espanolnetwork/AlienLanguageGame/main/images/animal' + i + '.png');
//    sonidos[i]= loadSound('https://raw.githubusercontent.com/espanolnetwork/AlienLanguageGame/main/audios/animal' + i + '.m4a');
//  }
//}

function setup() {
  createCanvas(0.9*ancho, 0.9*alto);
  ship = createImg('https://raw.githubusercontent.com/espanolnetwork/AlienLanguageGame/main/images/Ship.png');
  abducte = loadSound('https://raw.githubusercontent.com/espanolnetwork/AlienLanguageGame/main/audios/abducte.m4a')
  for (var i = 0; i < nombres.length; i++) {
    numbers[i]= i;
    animals[i]= createImg('https://raw.githubusercontent.com/espanolnetwork/AlienLanguageGame/main/images/animal' + i + '.png');
    sonidos[i]= loadSound('https://raw.githubusercontent.com/espanolnetwork/AlienLanguageGame/main/audios/animal' + i + '.m4a');
  }
  angleMode(DEGREES);
  Alienpos = 0.5*ancho;
  pos = 200;
  shnumbers = shuffle(numbers);
  textSize(32);
  r = shnumbers[floor(random(0, bolas))];
  score = 0;
  w = false;
  UFOship = new AlienShip(ship, Alienpos);
//  for (var i =0; i < 4; i++) {
//    a = shnumbers[i]
//    b = new Bubble(pos, alto/30, animals[a], nombres[a], a, r);
//    bubbles.push(b)
//    pos += 200;
//  }
}

function keyPressed() {
  if (w){
    score++;
  }
  w = false;
  bubbles.splice(0, bolas);
  shnumbers = shuffle(numbers);
  r = shnumbers[floor(random(0, bolas))];
  posk= 200;
  for (var i =0; i < bolas; i++) {
    a = shnumbers[i]
    b = new Bubble(360*(i+1)/bolas, animals[a], nombres[a], a, r);
    bubbles.push(b)
    posk += 200;
  }
  sonidos[r].play();
//  sonido.play();
}


function draw() {
  background(0);
  text(nombres[r], 500, 200);
  text(w, 700, 200);
  text(score, 900, 200);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
    bubbles[i].intersects();
    bubbles[i].puntaje();
    bubbles[i].mistake();
    text(bubbles[i].intersects(), 300, 100);
    if (bubbles[i].c){
      w = bubbles[i].c;
      Alienpos = bubbles[i].x;
      Alienalt = bubbles[i].altura;
    }
  }
  UFOship.display();
}

function mouseReleased () {
  if (w) {
    abducte.play();
    abducte.stop(0.5);
  }
  return false;
}

function Bubble(beta, img, pal, a, r) {
  this.x = 0;
  this.y = 0;
  this.beta = beta;
  this.img = img;
  this.pal = pal;
  this.a = a;
  this.r = r;
  this.c = false;
  this.f = false;
  this.diametro = 100;
  this.altura = 50;
  this.t = 0;

  this.display = function() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.diametro, this.diametro );
    fill(0, 102, 153);
    text(this.pal , this.x-25, this.y-60);
  }

  this.intersects = function() {
    d = dist(this.x, this.y, mouseX, mouseY);
    e = this.pal
    if (d < 50 && mouseIsPressed) {
      text(e + this.a, 100, 100);
      return this.a;
    }
  }

  this.puntaje = function() {
    if (d < 50 && mouseIsPressed && (this.a==this.r)) {
      text(e + this.a + 'igual'+ this.r, 500, 100);
      this.c = true;
      this.altura = this.y;
    }
  }

  this.mistake = function() {
    if (d < 50 && mouseIsPressed && (this.a!=this.r)) {
      this.f = true;
    }
  }

  this.move = function() {
    if (this.c){
      this.y-= 5;
      this.diametro = map(this.y, 50, this.altura, 0, 100);
    } else if (this.f){
      this.x+= 30;
    } else {
      this.x = ancho/2 + (ancho/3)*cos(this.t - this.beta);
      this.y = alto/2 + (alto/4)*sin(this.t - this.beta);
      this.t++;
    }

  }
}

function AlienShip(ship, x) {
  this.x = x;
  this.y = 50;
  this.ship = ship;
  this.angle = 0;

  this.display = function() {
    if (w) {
      this.x = Alienpos;
      noStroke();
      fill(0, 102, 153, 50);
      triangle(this.x, 50, this.x-60, Alienalt, this.x+60, Alienalt);
    } else {
      this.x = mouseX;
    }
    if (this.angle > 0) {
      this.angle -= 1;
    } else if (this.angle < 0) {
      this.angle += 1;
    }
    this.angle += movedX/11;
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.ship, 0, 0, 200, 72 );
  }
}
