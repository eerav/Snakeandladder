function init() {
    // console.log("In init")
    var canvas = document.getElementById('mycanvas');
    w = h = canvas.width = canvas.height = 850;
    pen = canvas.getContext('2d');
    cs = 60; //size of each cell of snake
    food = getRandomFood();
    score = 5;
    //create a image object for food
    food_img = new Image();
    food_img.src = "apple1.png";

    trophy = new Image();
    trophy.src = "medal1.png";


    game_over = false;
    // snake object
    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",
        // initializing the cells of snake - 1,0   2,0   3,0   4,0   5,0
        createSnake: function() {
            for (var i = this.init_len; i >= 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        // drawing initial snake of size 5 filling itnwith blue colour and fill those 5 cells
        drawSnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = "blue";
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 1, cs - 1);
            }
        },
        updateSnake: function() {
            // if snake eats food - increase lenght by 1 and generate new food object
            var headx = this.cells[0].x;
            var heady = this.cells[0].y;

            if (headx == food.x && heady == food.y) {
                // console.log("Food eaten");
                food = getRandomFood();
                score++;
            } else {
                this.cells.pop();
            }


            var nextX, nexty;

            if (this.direction == "right") {
                nextX = headx + 1;
                nexty = heady;
            }
            if (this.direction == "left") {
                nextX = headx - 1;
                nexty = heady;
            }
            if (this.direction == "down") {
                nextX = headx;
                nexty = heady + 1;
            }
            if (this.direction == "up") {
                nextX = headx;
                nexty = heady - 1;
            }

            this.cells.unshift({ x: nextX, y: nexty });

            //write logic that stops snake from going out
            var last_x = Math.round(w / cs);
            var last_y = Math.round(h / cs);
            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y) {
                game_over = true;
            }
        }
    };
    snake.createSnake();
    // Add event listener to keyboard
    function keypressed(e) {
        if (e.key == "ArrowRight") {
            snake.direction = "right";
        } else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        } else if (e.key == "ArrowDown") {
            snake.direction = "down";
        } else {
            snake.direction = "up";
        }

    }

    document.addEventListener('keydown', keypressed);
}

function draw() {
    // console.log("In draw");

    //erase old frame
    pen.clearRect(0, 0, w, h);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
    pen.drawImage(trophy, 20, 20, cs, cs);
    pen.fillStyle = "blue";
    pen.font = "25px sans-serif";
    pen.fillText(score, 50, 50)

}

function update() {
    // console.log("In update");
    snake.updateSnake();

}

// gives random food coordinates
function getRandomFood() {
    var foodX = Math.round(Math.random() * ((w - cs) / cs)); //ensures this lies within the range
    var foodY = Math.round(Math.random() * ((h - cs) / cs));
    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food;
}

function gameloop() {
    // console.log("In gameloop");
    if (game_over == true) {
        clearInterval(f);
        alert("Game over");
        return;
    }
    draw();
    update();

}
init();
var f = setInterval(gameloop, 100);