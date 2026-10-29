const GRID_SIZE = 20;
let snakeX = [300];
let snakeY = [300];
let dirX = 1;
let dirY= 0;
let foodX;
let foodY;

function setup() {
    frameRate(3);
    createCanvas(600, 600);
    direction = 20;
    foodX = foodCoord(width);
    foodY = foodCoord(height);
}

function draw() {
    background(153, 219, 105);
    drawSnake()
    fill(191, 4, 44)
    circle(foodX, foodY, GRID_SIZE);
    if (isGameOver() === false){
        moveSnake()
    }
    if (isOverFood()){
        addSegment()
        foodX = foodCoord(width);
        foodY = foodCoord(height);
    }
}

function drawSnake(){
    for(let i = 0; i < snakeX.length; i++){
        if (i===0){
            fill(0, 0, 255)
        } else {
            fill(81, 111, 201)
        }
        square(snakeX[i], snakeY[i], GRID_SIZE);
    }
}

function moveSnake(){
    /**for(let i = 0; i < snakeX.length; i++){
        snakeX[i] += GRID_SIZE * dirX;
        snakeY[i] += GRID_SIZE * dirY;
    } **/ 
   snakeX.unshift(snakeX[0] + GRID_SIZE * dirX) 
   snakeY.unshift(snakeY[0] + GRID_SIZE * dirY)
   snakeX.pop()
   snakeY.pop()  
}

/**
 * Checks if the snake has "eaten" the food (if head is over food)
 * @returns {boolean} true if the snake as "eaten" the food
 */
function isOverFood(){
    if (snakeX[0] === foodX - 10 && snakeY[0] === foodY - 10){
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

function isGameOver(){
    if (snakeX[0] < 0 || snakeX[0] > width - GRID_SIZE){
        return true;
    } else if (snakeY[0] < 0 || snakeY[0] > height - GRID_SIZE){
        return true;
    } else {
        return false
    }
}

function addSegment(){
    snakeX.push(snakeX[snakeX.length - 1] - GRID_SIZE * dirX)
    snakeY.push(snakeY[snakeY.length - 1] - GRID_SIZE * dirY)
    console.log(snakeX)
}

/**
 * Calculates the coordinates for the food to keep it within the grid
 * @param {number} axis, x or y axix (width or height)
 * @returns {number} the new x or y coordinate of the food
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