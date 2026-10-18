const GRID_SIZE = 20;
let headX = 20;
let headY = 20;
let dirX = 1;
let dirY= 0;
let foodX;
let foodY;
let gameOver;

function setup() {
    frameRate(3);
    createCanvas(600, 600);
    direction = headX;
    foodX = foodCoord(width);
    foodY = foodCoord(height);
}

function draw() {
    background(255);
    square(headX, headY, GRID_SIZE);
    circle(foodX, foodY, GRID_SIZE);
    if (!gameOver){
        headX += GRID_SIZE * dirX;
        headY += GRID_SIZE * dirY;
    }
    if (isGameOver(headX, 0, width - GRID_SIZE) === true || isGameOver(headY, 0, height - GRID_SIZE) === true){
        gameOver = true;
    }
}

function isGameOver(coord, minVal, maxVal){
    if (coord < minVal || coord > maxVal){
        return true;
    } else {
        return false
    }
}

function foodCoord(axis){
    let food
    food = floor(random(0, axis-GRID_SIZE));
    food = food - (food % 20) + (GRID_SIZE/2);
    return food;
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