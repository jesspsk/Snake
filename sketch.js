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

    if (isOverFood(headX, headY, foodX, foodY)){
        foodX = foodCoord(width);
        foodY = foodCoord(height);
    }

    if (outOfBounds(headX, 0, width - GRID_SIZE) || outOfBounds(headY, 0, height - GRID_SIZE)){
        gameOver = true;
    }

}

/**
 * Checks if the snake has "eaten" the food (if head is over food)
 *  @param {number} sX, snake headX
 * @param {number} sY, snake headY 
 * @param {numbere} fX, foodX 
 * @param {number} fY, foodY 
 * @returns {boolean} true if the snake as "eaten" the food
 */
function isOverFood(sX, sY, fX, fY){
    if (sX === fX - 10 && sY === fY - 10){
        return true
    }
}


/**
 * Checks if the snake's head hits a wall
 * @param {number} coord, the snake head's x or y coordinate  
 * @param {number} minVal, the minimum value coord can be before being out of bounds 
 * @param {number} maxVal , the maximum value coord can be before being out of bounds
 * @returns {boolean}, true if the head is out of bounds, false otherwise 
 */
function outOfBounds(coord, minVal, maxVal){
    if (coord < minVal || coord > maxVal){
        return true;
    } else {
        return false
    }
}


/**
 * Calculates the coordinates for the food to keep it within the grid
 * @param {number} axis, x or y axix (width or height)
 * @returns {number} the x or y coordinate of the food
 */
function foodCoord(axis){
    let food
    food = floor(random(0 + GRID_SIZE/2, axis - GRID_SIZE/2));
    food = food - (food % GRID_SIZE) + (GRID_SIZE/2);
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