function init() {
    var canvas = document.getElementById('board');
    var score = 0;
    W = H = canvas.width = canvas.height = 500;
    pen = canvas.getContext('2d');
    cell_size  = 30;
    food = getRandomFood();
    food_img = new Image();
    food_img.src = "assets/apple.png";
    score_img = new Image();
    score_img.src = "assets/trophy.png";
    trophy = new Image();
    var foodX,foodY;
    var X,Y;
    game_over = false;
    snake = {
        init_len : 5,
        color: "blue",
        cells : [],
        direction:"right",

        createSnake: function () {
            for(let i = this.init_len;i >0;i--){  //var let
                this.cells.push({x:i,y:0})
            }
        },
        drawSnake: function () {
            for(let i = 0; i < this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cell_size,this.cells[i].y*cell_size,cell_size-1,cell_size-1);
            }
            
        },

        updateSnake: function(){
            console.log("Update direction accordingly inside dict");
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if(headX === food.x && headY === food.y){
                console.log("Food");
                score++;    
                food = getRandomFood();
            }
            else{
                this.cells.pop();
            }
            if(this.direction === "right"){
                X = headX + 1;
                Y = headY;
            }
            else if(this.direction === "left"){
                X = headX - 1;
                Y = headY;
            }
            else if(this.direction === "down"){
                X = headX;
                Y = headY + 1;
            }
            else if(this.direction === "up"){
                X = headX;
                Y = headY-1;
            }
            this.cells.unshift({x:X,y:Y});

            var last_x = Math.round(W/cell_size);
            var last_y = Math.round(H/cell_size);
            if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
                game_over = true;
            }
        }
    };

    snake.createSnake();
    function keyPressed(event){
        console.log(event.key);
        if(event.key === "ArrowRight"){
            snake.direction = "right";
        }
        else if(event.key === "ArrowLeft"){
            snake.direction = "left";
        }
        else if(event.key === "ArrowDown"){
            snake.direction = "down";
        }
        else if(event.key === "ArrowUp"){
            snake.direction = "up";
        }
    }
    document.addEventListener('keydown',keyPressed);
}

function draw() {
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cell_size,food.y*cell_size,cell_size,cell_size);
    //pen.drawImage(score_img,18,20,cell_size,cell_size);
    pen.font = "20px Roboto";
    //pen.fillText(score,cell_size,cell_size);
}
function getRandomFood(){
    foodX = Math.round(Math.random()*((W-cell_size)/cell_size));
    foodY = Math.round(Math.random()*((H-cell_size)/cell_size));

    var food = {
        x:foodX,
        y:foodY,
        color: "red",
    }
    return food;
}
function update() {
    snake.updateSnake();
}

function gameloop() {
    if(game_over === true){
        clearInterval(f);
        alert("Its Over!");
        return;
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);