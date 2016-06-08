// Enemies our player must  avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y;
    this.speed=speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=this.speed*dt;
    if(this.x > 505)
        this.x =0;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// checking collision with player and if collision occurs player is reset to 
// starting position.
//Further enemy overlapping also dealt 
// TODO-enemy overlapping code
Enemy.prototype.collision = function(){
    //console.log("inside collision");
    if(this.x + 50>= player.x && this.x<=player.x+50 && this.y<= player.y+ 50 && this.y + 50>= player.y){
        player.x=200;
        player.y=398;
    }  
    allEnemies.forEach(function(enemy){
        //console.log("inside enemy overlap")
        if(this.x+50>=enemy.x && this.x<=enemy.x+50 && this.y<=enemy.y+50 && this.y+50>enemy.y){
            console.log("enemy collision");
        }
    });
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.x = 200;
    this.y = 398;
    this.sprite = 'images/char-boy.png';
};

//updates the player position
Player.prototype.update = function(){
    this.x=this.x;
    this.y=this.y;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x,this.y);
};

Player.prototype.handleInput=function(keycode){
        console.log("inside handleInput");
        if(keycode==="left"){
            this.x-=100;
        }
        else if(keycode==="up"){
            console.log("inside up");
            this.y=this.y-80;
        }
        else if(keycode==="right"){
            this.x+=100;
        }
        else if(keycode==="down"){
            this.y+=100;
        }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];

// Xpos ,Ypos are array of X and Y positions used in randomaly creating enemies 
// at different positions on screen

var Xpos= [-100,-50,0,-75];
var Ypos = [70,150,225];
var Rspeed = [150,160,190,110];

// generates random index for Xpos array
var randomX = function(){
    return(Math.floor((Math.random()*(3-0+1))+0));
}

// generates random index for Ypos array
var randomY = function(){
    return(Math.floor((Math.random()*(2-0+1))+0));
};

var randomSpeed = function(){
    return(Math.floor((Math.random()*(3-0+1))+0));
};

allEnemies.push(new Enemy(Xpos[randomX()],75,110));
allEnemies.push(new Enemy(Xpos[randomX()],150,60));
allEnemies.push(new Enemy(Xpos[randomX()],225,90));
allEnemies.push(new Enemy(Xpos[randomX()],Ypos[randomY()],Rspeed[randomSpeed()]));
allEnemies.push(new Enemy(Xpos[randomX()],Ypos[randomY()],Rspeed[randomSpeed()]));

// checks for collision of player with each bug
var checkCollisions = function(){
    allEnemies.forEach(function(enemy){
        enemy.collision();
    });
}
console.table(allEnemies);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
 