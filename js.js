var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');
var score = 0, count_tail = 0;
var snake = [[300, 300], [300, 330], [300, 360]];
var up = false, down = false, left = false, right = false;
var old;

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            if(old != "right"){
                up = false
                down = false
                left = true
                right = false
                old = "left"
            }
        } else {
            if(old != "left"){
                up = false
                down = false
                left = false
                right = true
                old = "right"
            }
        }                       
    } else {
        if ( yDiff > 0 ) {
            if(old != "down"){
                up = true
                down = false
                left = false
                right = false
                old = "up"  
            }          
        } else { 
            if(old != "up"){
                up = false
                down = true
                left = false
                right = false
                old = "down"
            }
        }                                                                 
    }
    xDown = null;
    yDown = null;                                             
};


//random pos of apple
function random_pos(){
    var p;
    while(p % 30 != 0){
        p = Math.floor(Math.random() * 630);
    }
    return p
}
var apple_x = random_pos()
var apple_y = random_pos()

//borders event
function border(){
    if(snake[0][0] > 600){
        snake[0][0] = 0
    }
    else if (snake[0][0] < 0) {
        snake[0][0] = 600
    }
    if(snake[0][1] > 600){
        snake[0][1] = 0
    }
    else if (snake[0][1] < 0){
        snake[0][1] = 600
    }
}
//draw snake and apple
function draw(){
    //clear game field
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    //draw apple
    ctx.fillStyle ='RGB(255,0,0)';
    ctx.fillRect(apple_x + 1, apple_y + 1, 29, 29);

    //draw snake
    for(var i = 0;i < snake.length; i++){
        var x = snake[i][0], y = snake[i][1];
        if(i == 0){
            ctx.fillStyle = 'RGB(0, 255, 255)'
        }
        else{
            ctx.fillStyle = 'RGB(0, 150, 255)'
        }
        ctx.fillRect(x+1, y+1, 29, 29)
    };
}
setInterval(draw, 16)


function control_buttons(event) {
    var key = `${event.key}`
    if(key == "ArrowUp" && old != "down"){
        up = true
        down = false
        left = false
        right = false
        old = "up"
    }
    if(key == "ArrowDown" && old != "up"){
        up = false
        down = true
        left = false
        right = false
        old = "down"
    }
    if(key == "ArrowLeft" && old != "right"){
        up = false
        down = false
        left = true
        right = false
        old = "left"
    }
    if(key == "ArrowRight" && old != "left"){
        up = false
        down = false
        left = false
        right = true
        old = "right"
    }
}
document.addEventListener('keydown', control_buttons);

// game function
function game(){
    //score dispaly
    document.getElementById("score").innerHTML = "Score: " + score;

    // when apple eat event
    if (snake[0][0] == apple_x && snake[0][1] == apple_y){
        score++;
        var x = snake[snake.length - 1][0]
        var y = snake[snake.length - 1][1]
        if(up){
            snake.push([x,y])
        }
        if(down){
            snake.push([x,y])
        }
        if(left){
            snake.push([x,y])
        }
        if(right){
            snake.push([x, y])
        }
        apple_x = random_pos()
        apple_y = random_pos()
    }

    //old coordinates snakes head
    var old_x = snake[0][0];
    var old_y = snake[0][1];

    //change position snakes head
    if(up){
        snake[0][1] -= 30;
    }
    if(down){
        snake[0][1] += 30;
    }
    if(left){
        snake[0][0] -= 30;
    }
    if(right){
        snake[0][0] += 30;
    }

    // border event
    border();

    // animation change pos snakes body
    if(up || down || left || right){
        if(count_tail == 0){
            count_tail = snake.length - 1
        }
        snake[count_tail][0] = old_x;
        snake[count_tail][1] = old_y;
        count_tail--;
    }
    // game over event
    for(var i = 1;i < snake.length; i++){
        if(snake[0][0] == snake[i][0] && snake[i][1] == snake[0][1]){
            clearInterval(1);
            location.reload()
            }
        }
}
setInterval(game, 120);                                                                                                                                                        