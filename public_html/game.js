//cria canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.getElementById("game").appendChild(canvas);

//imagem de fundo
let bgReady = false;
const bgIMage = new Image();

bgIMage.onload = function () {
	bgReady = true;
};
bgIMage.src = 'img/grama.jpg';

//imagem animal

let animalReady = false;
const animalIMage = new Image();

animalIMage.onload = function () {
	animalReady = true;
};
animalIMage.src = 'img/hero.png';

//imagem coletavel

let frutReady = false;
const frutIMage = new Image();

frutIMage.onload = function () {
	frutReady = true;
};
frutIMage.src = 'img/maca.png';

//objetos

const animal = {
	speed : 256 // movimento pixels por segundo
};
const frut = {};
let frutCont = 0;

//controles

const KeysDown ={};
console.log(animal.speed);

window.addEventListener("keydown", function(e){
 	//console.log(e);
 KeysDown[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function(e){
 	//console.log(e);
 delete KeysDown[e.keyCode]}, false);


//reset
const initAnimal = function () {
	animal.x = canvas.width / 2;
	animal.y = canvas.height / 2;
};
const gerafrut = function (){
	
	frut.x = 32 + (Math.random() * (canvas.width - 64));
	frut.y = 32 + (Math.random() * (canvas.height - 64));

};

//atualiza

const update = function(modifier){
  
 if (38 in KeysDown) {
 	//console.log("Up");
 	if (animal.y > 2) {
 		animal.y -= animal.speed * modifier;
 	}
 	
 }
 if (40 in KeysDown) {
 	//console.log("dow");
 	if (animal.y < 447) {
 		animal.y += animal.speed * modifier;
 	}
 	
 }
 if (37 in KeysDown) {
 	//console.log("lef");
 	if (animal.x > 2) {
 		animal.x -= animal.speed * modifier;
 	}
 	
 }
 if (39 in KeysDown) {
 	//console.log("height");
 	if (animal.x < 478) {
 		animal.x += animal.speed * modifier;
 	}
 	
 }

if (animal.x <= (frut.x + 32)
	&& frut.x <= (animal.x + 32)
	&&animal.y <= (frut.y + 32)
	&& frut.y <= (animal.y + 32)
	){
	++frutCont;
	gerafrut();
}
};

const render = function(){
	if (bgReady) {
		ctx.drawImage(bgIMage,0,0);
	}
	if(animalReady){
		ctx.drawImage(animalIMage,animal.x,animal.y);
	}
	if(frutReady){
		ctx.drawImage(frutIMage,frut.x,frut.y);
	}
	ctx.fillStyle = 'rgb(250,250,250)';
	ctx.font = '24px Helvetica';
	ctx.textAling = 'let';
	ctx.textBaseLine = 'top';
	ctx.fillText('Total de frutas: ' + frutCont, 32 ,32);

};

// Controla o loop do jogo
var main = function main() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;
  //console.log(" X " + animal.x + " Y " + animal.y);
  // Executa isso o mais breve possível
  requestAnimationFrame(main);
};

// Suporte cross-browser para requestAnimationFrame
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Que comece o jogo!
var then = Date.now();
gerafrut();
initAnimal();
main();
