const GRID_SIZE = 20;
let headX = 20;
let headY = 20;
let foodX;
let foodY;

function setup() {
    frameRate(3);
    createCanvas(600, 600);
    foodX = floor(random(0 + GRID_SIZE/2, width-GRID_SIZE/2));
    foodX = foodX - (foodX % 20);
    foodY = floor(random(0 + GRID_SIZE/2, height-GRID_SIZE/2));
    foodY = foodY - (foodY % 20);
}

function draw() {
    background(255);
    square(headX, headY, GRID_SIZE);
    circle(foodX, foodY, GRID_SIZE);
    if (headX < width - GRID_SIZE){
        headX += GRID_SIZE;
    }
}