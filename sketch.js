const GRID_SIZE = 20;
let headX = 20;
let headY = 20;
let foodX;
let foodY;

function setup() {
    frameRate(3);
    createCanvas(600, 600);
    foodX = floor(random(0, width-GRID_SIZE));
    foodX = foodX - (foodX % 20) + (GRID_SIZE/2);
    foodY = floor(random(0, height-GRID_SIZE));
    foodY = foodY - (foodY % 20) + (GRID_SIZE/2);
}

function draw() {
    background(255);
    square(headX, headY, GRID_SIZE);
    circle(foodX, foodY, GRID_SIZE);
    if (headX < width - GRID_SIZE){
        headX += GRID_SIZE;
    }
}