const GRID_SIZE = 20;
let food ;
let snake;
let gameFont;
let points = 0;
let startBtn;
let radioBtn;


async function setup() {
    gameFont = await loadFont("assets/Jersey_10/Jersey10-Regular.ttf")
    const container = select("main");
    restart()
    frameRate(3);
    createCanvas(600, 600);
}

function draw() {
    background(153, 219, 105);
    stroke(0);
    strokeWeight(1);
    snake.drawSnake();
    food.drawFood();
    displayPoints();
    if (snake.hitWall() === false){
        snake.moveSnake()
    } else {
        displayGameOver()
    }
    if (snake.isOverFood()){
        snake.addSegment()
        points += 1;
        food = new Food();
    }
}


function initBtn(){
    startBtn = createButton("Start Game");
    startBtn.parent(container);
    radioBtn = createButton("Level");
    radioBtn.parent(container);

}

function keyPressed() {
    if (key==='w' || key===UP_ARROW) {
        snake.dirY = -1
        snake.dirX = 0
    }
    if (key==='a' || key===LEFT_ARROW) {
        snake.dirX = -1
        snake.dirY = 0
    }
    if (key==='s' || key===DOWN_ARROW) {
        snake.dirY = 1
        snake.dirX = 0
    }
    if (key==='d' || key===RIGHT_ARROW) {
        snake.dirX = 1
        snake.dirY = 0
    }
    if (key===' ' && snake.hitWall()){
        restart()
    }
}


/**
 * Draws the "Game Over" screen
 */
function displayGameOver(){
    background(0);
    fill(255, 0, 0);
    strokeWeight(5);
    stroke(140, 1, 1);
    textAlign(CENTER,CENTER);
    textSize(80)
    text("GAME OVER", 300, 260);
    textSize(25);
    text("Press 'Space' to restart", 300, 310);
    textSize(35);
    text(`Points: ${points}`, 300, 380)
}


/**
 * Displays the total points ( total food eaten) in the top left corner
 */
function displayPoints(){
    fill(0);
    noStroke();
    textFont(gameFont);
    textAlign(LEFT, TOP);
    textSize(25);
    text(`Points: ${points}`, 20, 20)
}


/**
 * Restarts the game by resetting the snake to it's original state and generating a new location for the food
 */
function restart(){
    snake = new Snake()
    food = new Food()
    points = 0;
}


class Food{ 
    constructor(){
        this.x = this.foodCoord(width);
        this.y = this.foodCoord(height);
    }

    /**
     * Calculates the coordinates for the food to keep it within the grid
     * @param {number} axis, x or y axix (width or height)
     * @returns {number} the new x or y coordinate of the food
     */
    foodCoord(axis){
        let food
        food = floor(random(0 + GRID_SIZE/2, axis - GRID_SIZE/2));
        food = food - (food % GRID_SIZE) + (GRID_SIZE/2);
        return food;
    }

    /**
    * Draws a circle representing "food"
    */
    drawFood(){
        fill(191, 4, 44)
        circle(this.x, this.y, GRID_SIZE);
    }
}


class Snake{
    constructor(){
        this.x = [300];
        this.y = [300];
        this.dirX = 1;
        this.dirY = 0
    }

    /**
     * Draws the snake by creating a square for each pair of coordinates
     */
    drawSnake(){
        for(let i = 0; i < this.x.length; i++){
            if (i===0){
                fill(0, 0, 255)
            } else {
                fill(81, 111, 201)
            }
            square(this.x[i], this.y[i], GRID_SIZE);
        }
    }

    /**
     * Moves the snake by changing the position of the last segment to the new head
     */
    moveSnake(){
    this.x.unshift(this.x[0] + GRID_SIZE * this.dirX) 
    this.y.unshift(this.y[0] + GRID_SIZE * this.dirY)
    this.x.pop()
    this.y.pop()  
    }


    /**
     * Adds the coordinates of a new segment to the snake arrays
     */
    addSegment(){
        this.x.push(this.x[this.x.length - 1] - GRID_SIZE * this.dirX)
        this.y.push(this.y[this.y.length - 1] - GRID_SIZE * this.dirY)
    }

    /**
     * Checks if the snake has "eaten" the food (if head is over food)
     * @returns {boolean} true if the snake as "eaten" the food
     */
    isOverFood(){
        if (this.x[0] === food.x - 10 && this.y[0] === food.y - 10){
            return true
        }
    }

    /**
     * Check if the snake's head has hit a wall
     * @returns {boolean}
     */
    hitWall(){
        if (this.x[0] < 0 || this.x[0] > width - GRID_SIZE){
            return true;
        } else if (this.y[0] < 0 || this.y[0] > height - GRID_SIZE){
            return true;
        } else {
            return false;
        }
    }

}


