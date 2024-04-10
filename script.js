
//board
var blocksize = 25;
var rows = 20;
var col = 20;
var board;
var context;

//snake head
var SnakeX = blocksize *5;
var SnakeY = blocksize *5;

var velocityX =0;
var velocityY =0;

var snakeBody = [ ];

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = col * blocksize;
    context = board.getContext("2d"); //drawing on the board

    placefood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update, 1000/10);
}

function update(){

    if (gameOver){
        return;
    }

    context.fillStyle ="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle ="Red";
    context.fillRect (foodX, foodY, blocksize, blocksize);

    if (SnakeX == foodX && SnakeY == foodY){
        snakeBody.push([foodX,foodY]);
        placefood();
    }

    for (let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody [i-1];
    }
    if (snakeBody.length){
        snakeBody[0] = [SnakeX, SnakeY];
    }


    context.fillStyle = "Green";
    SnakeX += velocityX * blocksize;
    SnakeY += velocityY * blocksize;
    context.fillRect (SnakeX, SnakeY, blocksize, blocksize);

    for (let i= 0; i< snakeBody.length; i++){
        context.fillRect(snakeBody [i][0],snakeBody[i][1], blocksize, blocksize);
    }

    if (SnakeX < 0 || SnakeX > col *blocksize || SnakeY <0 || SnakeY > rows *blocksize){
        gameOver = true ;
        alert ("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++){
        if (SnakeX == snakeBody [i][0] && SnakeY == snakeBody [i][1] ){
            gameOver = true;
            alert("Game Over");
        }
    }
   
}

function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;  
    }

    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;  
    }

    else if (e.code == "ArrowLeft"&& velocityX != 1){
        velocityX = -1;
        velocityY = 0;  
    }

    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;  
    }
}


function placefood(){
    foodX =Math.floor(Math.random()*col)*blocksize;
    foodY =Math.floor(Math.random()*rows)*blocksize;
}