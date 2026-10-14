const GRID_SIZE = 20;
let headX = 20;
let headY = 20;
let dirX = 1;
let dirY= 0;
let foodX;
let foodY;
let gameOver = false;

function setup() {
    frameRate(3);
    createCanvas(600, 600);
    direction = headX;
    foodX = floor(random(0, width-GRID_SIZE));
    foodX = foodX - (foodX % 20) + (GRID_SIZE/2);
    foodY = floor(random(0, height-GRID_SIZE));
    foodY = foodY - (foodY % 20) + (GRID_SIZE/2);
}

function draw() {
    background(255);
    square(headX, headY, GRID_SIZE);
    circle(foodX, foodY, GRID_SIZE);
    if (!gameOver){
        headX += GRID_SIZE * dirX;
        headY += GRID_SIZE * dirY;
    }
    if (headX < 0 || headX > width - GRID_SIZE || headY < 0 || headY > height - GRID_SIZE){
        gameOver = true;
    }
    
}

function keyPressed() {
    if (key==='w' || key===UP_ARROW) {
        dirY = -1
        dirX = 0
    }
    if (key==='a' || key===LEFT_ARROW) {
        dirX = -1
        dirY = 0
    }
    if (key==='s' || key===DOWN_ARROW) {
        dirY = 1
        dirX = 0
    }
    if (key==='d' || key===RIGHT_ARROW) {
        dirX = 1
        dirY = 0
    }
}