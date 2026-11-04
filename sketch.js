const GRID_SIZE = 20;
let snake = {
    X : [300],
    Y : [300]
}
let dirX = 1;
let dirY = 0;
let food = {
    X: 0,
    Y : 0,
}

function setup() {
    frameRate(3);
    createCanvas(600, 600);
    direction = 20;
    food.X = foodCoord(width);
    food.Y = foodCoord(height);
}

function draw() {
    background(153, 219, 105);
    drawSnake()
    fill(191, 4, 44)
    circle(food.X, food.Y, GRID_SIZE);
    if (isGameOver() === false){
        moveSnake()
    }
    if (isOverFood()){
        addSegment()
        food.X = foodCoord(width);
        food.Y = foodCoord(height);
    }
}


/**
 * "Draws" the snake by creating a square for each pair of coordinates
 */
function drawSnake(){
    for(let i = 0; i < snake.X.length; i++){
        if (i===0){
            fill(0, 0, 255)
        } else {
            fill(81, 111, 201)
        }
        square(snake.X[i], snake.Y[i], GRID_SIZE);
    }
}


/**
 * Moves the snake by changing the position of the last segment to the new head
 */
function moveSnake(){
    /**for(let i = 0; i < snakeX.length; i++){
        snakeX[i] += GRID_SIZE * dirX;
        snakeY[i] += GRID_SIZE * dirY;
    } **/ 
   snake.X.unshift(snake.X[0] + GRID_SIZE * dirX) 
   snake.Y.unshift(snake.Y[0] + GRID_SIZE * dirY)
   snake.X.pop()
   snake.Y.pop()  
}


/**
 * Adds the coordinates of a new segment to the snake arrays
 */
function addSegment(){
    snake.X.push(snake.X[snake.X.length - 1] - GRID_SIZE * dirX)
    snake.Y.push(snake.Y[snake.Y.length - 1] - GRID_SIZE * dirY)
}


/**
 * Checks if the snake has "eaten" the food (if head is over food)
 * @returns {boolean} true if the snake as "eaten" the food
 */
function isOverFood(){
    if (snake.X[0] === food.X - 10 && snake.Y[0] === food.Y - 10){
        return true
    }
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

/**
 * Check if the snake's head has hit a wall
 * @returns {boolean}
 */
function isGameOver(){
    if (snake.X[0] < 0 || snake.X[0] > width - GRID_SIZE){
        return true;
    } else if (snake.Y[0] < 0 || snake.Y[0] > height - GRID_SIZE){
        return true;
    } else {
        return false
    }
}