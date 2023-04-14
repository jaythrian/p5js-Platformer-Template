let playerPos;
let playerSpeed;
let playerWidth;
let touchingGround = true;
let jumpSpeed = 20;
let jump = jumpSpeed;
let gravity = 5;
let blockWidth = 100;

function setup() {
	createCanvas(500, 500);
	background(200);
	playerPos = [width/2, height - 30];
	playerSpeed = 8;
	playerWidth = 30;
	a = new Blocks(width - playerWidth, height - 4*playerWidth, blockWidth, playerWidth);
	}

function draw() {
	background(200);
	rect(playerPos[0], playerPos[1], playerWidth, playerWidth);	
	playerMovement();
	a.update();
	
}

class Blocks {
	
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		rect(this.x, this.y, this.width, this.height);
	}
	
	update(){
		//this.x -= playerSpeed;
		rect(this.x, this.y, this.width, this.height);
	}	
	
	cameraLeft(){
		this.x -= playerSpeed;
	}
	
	cameraRight(){
		this.x += playerSpeed;
	}
}

function handleTouchingGround(){
	// if player is jumping
	// and var jump is greater than
	// zero
	// make player's jump slow down
	// and subtract from var jump
	if (touchingGround == false){
		if (jump > 0){
			playerPos[1] -= jump;
			jump -= 0.8;
		}
		// if var jump <= 0
		// than activate gravity
		// we add +1 to gravity
		// to make it look fluid
		else if(jump <= 0){
			playerPos[1] += gravity;
			gravity += 1;
		}
	}
	// if player is touching ground
	// than reset vars jump and gravity
	if (touchingGround == true){
		jump = jumpSpeed;
		gravity = 5;
	}
}

function collision(){
	// eventually need to loop for every box
	// need logic for player collision with box sides
	
	// register player as standing ontop of box
	if (playerPos[0] >= a.x && (playerPos[0] + playerWidth) <= a.x + a.width){
		if (playerPos[1] <= a.y && (playerPos[1] + playerWidth) >= a.y){
			playerPos[1] = a.y - a.height; 
			touchingGround = true;
		}
	}	
	// if player walks off of a box (i.e. x vals aren't aligning) then incorporate
	// falling logic
	if (playerPos[1] == a.y - a.height){
		if (!(playerPos[0] >= a.x && (playerPos[0] + playerWidth) <= a.x + a.width)){
			// activates gravity by taking
			// away jump ability from player
			jump = 0;
			touchingGround = false;
		}
	}
	// registers if player has hit the bottom of the box
	// and does the corresponding jump/gravity logic
	else if (playerPos[0] >= a.x && (playerPos[0] + playerWidth) <= a.x + a.width){
		if (playerPos[1] <= (a.y + a.height) && (playerPos[1] + playerWidth) >= a.y){
			playerPos[1] = a.y + a.height;
			jump = 0;
			touchingGround = false;
		}
	}
	
}

function playerMovement(){	
	
	handleTouchingGround();
	collision();
	
	// check if w pressed
	if (keyIsDown(87) && touchingGround == true){
			// makes jump look fluid
			// by slowing down jump rate
			// via handleTouchingGround() 
			playerPos[1] -= jump; 
			jump -= 1;
			touchingGround = false;
	}
	/*
	// check if s pressed
	if (keyIsDown(83)){
		playerPos[1] += playerSpeed;
	}
	*/
	// check if a pressed
	if (keyIsDown(65)){
		playerPos[0] -= playerSpeed;
	}
	// check if d pressed
	if (keyIsDown(68)){
		playerPos[0] += playerSpeed;
	}
	
	// check if player out of bounds on x axis
	// right bound
	if (playerPos[0] >= width - playerWidth){
		if (keyIsDown(68)){
			a.cameraLeft();
		}
		playerPos[0] = width - playerWidth;
	}
	// x axis left bound
	if (playerPos[0] <= 0){
		if (keyIsDown(65)){
			a.cameraRight();
		}
		playerPos[0] = 0;
	}
	// make sure player doesn't fall off bottom of screen
	if (playerPos[1] >= height - playerWidth && touchingGround == false){
		playerPos[1] = height - playerWidth;
		touchingGround = true;
	}
}
