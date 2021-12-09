let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d"); //Nu kan vi skrive på canvas



//Et array i et array (et multidimensionelt array)
let arr = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,2,2,0,3,7,3,0,3,0,0,0,0],
    [0,3,2,0,3,2,3,3,3,0,0,0,0],
    [0,0,2,3,0,2,2,2,2,2,7,0,0],
    [0,2,2,3,0,2,3,2,3,3,0,0,0],
    [0,2,3,0,3,2,3,2,3,0,0,0,0],
    [0,2,3,0,3,2,3,2,3,3,3,0,0],
    [0,2,4,2,2,2,3,2,3,0,0,0,0],
    [0,3,2,3,0,3,3,2,3,0,0,0,0],
    [0,0,2,0,0,3,0,2,0,0,7,0,0],
    [0,0,0,0,0,0,0,2,3,3,2,0,0],
    [0,0,3,0,7,0,0,2,2,2,2,0,0],
    [0,3,0,0,2,0,0,0,0,0,2,0,0],
    [0,3,0,2,2,2,2,2,2,0,2,0,0],
    [0,0,0,2,0,3,0,0,2,2,2,0,0],
    [0,0,7,2,0,0,3,3,0,3,3,0,0],
    [0,0,0,2,2,2,2,2,0,0,0,0,0],
    [0,3,3,3,3,0,0,2,0,0,0,0,0],
    [0,0,3,3,0,0,0,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,5,0,0,0,0,0],


];
let wall = 0;
let player = 1;
let path = 2;
let tree = 3;
let enemy = 4;
let goal = 5;
let sky = 6;
let point = 7;

let playerPosition = {x:0, y:0}
let enemyPosition = {x:0, y:0}

function reload(){
    setInterval(()=>{
        location.reload()
    },1000)
}
function enemyWalk(){ 
    
    let rand = Math.floor(Math.random() *2)+1;
    if(rand == 2){//op
        
        if(arr[enemyPosition.x -1][enemyPosition.y] == path || arr[enemyPosition.x-1][enemyPosition.y] == player ){
            arr[enemyPosition.x -1][enemyPosition.y] = enemy;
             arr[enemyPosition.x][enemyPosition.y] = path;
         }
        

    }else if(rand == 1){//ned
        
        if( arr[enemyPosition.x +1][enemyPosition.y] == path ||arr[enemyPosition.x+1][enemyPosition.y] == player ){
            arr[enemyPosition.x +1] [enemyPosition.y] = enemy;
            arr[enemyPosition.x][enemyPosition.y] = path;
            
     }
    
     
 }
 drawMaze();
 console.log(rand); 

}

setInterval(()=>{
    enemyWalk()
},1000)

let skyPosition = {x:0, y:0}



function skyWalk(){ 
    
    let rand = Math.floor(Math.random() *2)+1;
    if(rand == 2){//op
        
        if(arr[skyPosition.y -1][skyPosition.x] == path){
            arr[skyPosition.y -1][skyPosition.x] = sky
             arr[skyPosition.y][skyPosition.x] = path
         }

    }else if(rand == 1){//ned
        
        if( arr[skyPosition.y +1][skyPosition.x] == path){
            arr[skyPosition.y +1] [skyPosition.x] = sky
            arr[skyPosition.y][skyPosition.x] = path
     }
 }
 drawMaze();
 console.log(); 

}

let points = 0;
function pointsCount(){ 
   points = points += 1;
   document.getElementById('score').innerHTML = "Score: " + points;
   drawMaze();

}

let img = new Image();
img.src= 'img/unicloud.jpg';

let billede = new Image();
billede.src= 'img/cloud.jpg';

let enemyAngry = new Image();
enemyAngry.src= 'img/enemy.jpg';

let home = new Image();
home.src= 'img/goal.jpg';

let fjende = new Image();
fjende.src= 'img/enemy.jpg'

let cake = new Image();
cake.src = 'img/point.jpg'

console.log(arr);
function drawMaze(){

    


//Et loop i et loop
for(let x = 0; x < arr.length; x++){
    for(let y = 0; y < arr[x].length; y++){
        if (arr[x][y] == wall){

            ctx.fillStyle = "cornflowerblue";
            ctx.fillRect (x*50,y*50,50,50);

    }
        else if(arr[x][y] == player){
            playerPosition.x = x;
            playerPosition.y = y;
            console.log(playerPosition);
        ctx.drawImage(img,x*50,y*50,50,50);
        }
        else if(arr[x][y] == tree){
                ctx.drawImage (billede,x*50,y*50,50,50);
            }
                else if(arr[x][y] == goal){
                ctx.drawImage (home,x*50,y*50,50,50);
                 }
                 else if(arr[x][y] == sky){
                    ctx.drawImage (fjende,x*50,y*50,50,50);
                     }
                     else if(arr[x][y] == point){
                        ctx.drawImage (cake,x*50,y*50,50,50);
                         }
                    else if(arr[x][y] == path){
                     ctx.fillStyle = "plum";
                     ctx.fillRect (x*50,y*50,50,50);
                    }
                        else if(arr[x][y] == enemy){
                            enemyPosition.x = x;
                            enemyPosition.y = y;
                            console.log(enemyPosition);
                            ctx.drawImage (enemyAngry,x*50,y*50,50,50);
                        }
    }
}
}
drawMaze();
console.log(canvas)
document.addEventListener("keyup",function(event){
    
    /* 
    left: 37
    up:38
    down: 40
    right: 39
    */  

        function pathSound(){
                let gameSound = new Audio('sound/wind.mp3');
                gameSound.play();
            }
            function goalSound(){
                let gameSound2 = new Audio('sound/goal.mp3');
                gameSound2.play();
            }
            function cakeSound(){
                let gameSound3 = new Audio('sound/point.mp3');
                gameSound3.play();
            }
            function enemySound(){
                let gameSound4 = new Audio('sound/enemy.mp3');
                gameSound4.play();
            }

    
    switch(event.keyCode){
        case 37:
            console.log("du har ramt venstre tast")
            if(arr[playerPosition.x -1][playerPosition.y ] == path){
                arr[playerPosition.x -1][playerPosition.y ] = player
                arr[playerPosition.x][playerPosition.y] = path
                pathSound();
            }
            
           
            else if(arr[playerPosition.x -1][playerPosition.y ] == point){
                arr[playerPosition.x -1][playerPosition.y ] = player
                arr[playerPosition.x][playerPosition.y] = path
                pointsCount();   
                cakeSound(); 
            }
            else if(arr[playerPosition.x -1][playerPosition.y ] == enemy){
                arr[playerPosition.x -1][playerPosition.y ] = enemy
                arr[playerPosition.x][playerPosition.y] = enemy
                enemySound();
                reload();
            }
            else if(arr[playerPosition.x ][playerPosition.y] == enemy){
                enemySound();
            }
            drawMaze();
            
            break;
        case 38:
            if(arr[playerPosition.x][playerPosition.y -1] == path){
                arr[playerPosition.x ][playerPosition.y -1] = player
                arr[playerPosition.x][playerPosition.y] = path
                pathSound();
            }
            else if(arr[playerPosition.x ][playerPosition.y -1] == point){
                arr[playerPosition.x ][playerPosition.y -1] = player
                arr[playerPosition.x][playerPosition.y] = path
                pointsCount();
                cakeSound();
            }
            else if(arr[playerPosition.x ][playerPosition.y -1] == enemy){
                arr[playerPosition.x ][playerPosition.y -1] = enemy
                arr[playerPosition.x][playerPosition.y] = enemy
                enemySound();
                reload();
            }
            else if(arr[playerPosition.x ][playerPosition.y] == enemy){
                enemySound();
            }
            drawMaze();
            
            console.log("du har ramt op tast")
            break;
        case 39:
            if(arr[playerPosition.x +1][playerPosition.y ] == path){
                arr[playerPosition.x +1][playerPosition.y ] = player
                arr[playerPosition.x][playerPosition.y] = path
                pathSound();
            }
            else if(arr[playerPosition.x +1][playerPosition.y ] == point){
                arr[playerPosition.x +1][playerPosition.y ] = player
                arr[playerPosition.x][playerPosition.y] = path
                pointsCount();
                cakeSound();
            }
            else if(arr[playerPosition.x +1][playerPosition.y ] == goal){
                arr[playerPosition.x +1][playerPosition.y ] = player
                arr[playerPosition.x][playerPosition.y] = path
                goalSound();
                reload();
            }
            else if(arr[playerPosition.x +1][playerPosition.y ] == enemy){
                arr[playerPosition.x +1][playerPosition.y ] = enemy
                arr[playerPosition.x][playerPosition.y] = enemy
                enemySound();
                reload();
            }
            else if(arr[playerPosition.x ][playerPosition.y] == enemy){
                enemySound();
            }
            drawMaze();
            
            console.log("Du har ramt højre tast")
            break;
        case 40:
            if(arr[playerPosition.x ][playerPosition.y +1] == path){
                arr[playerPosition.x ][playerPosition.y +1] = player
                arr[playerPosition.x][playerPosition.y] = path
                pathSound();
            }
            else if(arr[playerPosition.x ][playerPosition.y +1] == point){
                arr[playerPosition.x ][playerPosition.y +1] = player
                arr[playerPosition.x][playerPosition.y] = path
                pointsCount();
                cakeSound();
            }
            else if(arr[playerPosition.x ][playerPosition.y +1] == enemy){
                arr[playerPosition.x ][playerPosition.y +1] = enemy
                arr[playerPosition.x][playerPosition.y] = enemy
                enemySound();
                reload();
            }
            else if(arr[playerPosition.x ][playerPosition.y] == enemy){
                enemySound();
            }
            drawMaze();
            
            console.log("Du har ramt ned tast")
            /*document.querySelector("body"),
            style.backgroundColor = "purple"*/
            break;
    }

   if(event.keyCode == 37){
       console.log("du har ramt venstre")
   }
   else if(event.keyCode == 38){
       console.log("op")
   }
   else if(event.keyCode == 40){
       console.log("ned")
   }
   else if(event.keyCode == 39){
       console.log("højre")
   }
   
   
})
drawMaze();
window.addEventListener("load",drawMaze);


