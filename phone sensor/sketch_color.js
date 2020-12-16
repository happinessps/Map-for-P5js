// The map() Function
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/beginners/p5js/2.4-map.html
// https://youtu.be/nicMAoW6u1g
// https://editor.p5js.org/codingtrain/sketches/yJqbGf71

var s;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	s= 0;
}

function draw(){
	blendMode(ADD);
	colorMode(HSB, 255);
	for(var i = 0; i < touches.length; i++){
		noStroke();
		fill(frameCount%255, 255, 8);
		var x = touches[i].x;
		var y = touches[i].y;
		ellipse(x,y,s,s);
	}
	colorMode(RGB, 255);
}

function touchMoved(){
	s = min(300, s+5);
	return false;
}

function touchStarted(event){
	s = 0;
}

function touchEnded(event){
	
}