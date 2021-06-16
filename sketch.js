var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  gameoverImage=loadImage("gameOver.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
 
  FoodGroup= new Group()
  obstacleGroup= new Group()
  
  score = 0;
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  textSize(20);
  fill("white"); 
  text("score:"+score,280 ,50)

  if(keyDown("space") ) {
    player.velocityY = -12;
  }
  player.velocityY = player.velocityY + 0.8;

  player.collide(ground);
 

    if(World.frameCount%200===0){
      fruits()
   }
     
    if(World.frameCount%200===0){
      stones()
   }
    
    
 
   if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
    
   
    textSize(20);
    fill("black");
       survivaltime=Math.ceil(frameCount/12)
    text("Survival Time : " +survivaltime,20,50);
    
      
      if(player.isTouching(FoodGroup)){
       FoodGroup.destroyEach()
      score=score+5
      
        }
      if (obstacleGroup.isTouching(player)){
         gameState = END;
         
       }
       
       }
    
      else if(gameState==END){
      
        survivaltime=0;
       player.destroy();
     FoodGroup .destroyEach();
     obstacleGroup.destroyEach();
       obstacleGroup.setVelocityXEach(0);
       FoodGroup.setVelocityXEach(0);
        
   
        geo=createSprite(200,200,10,10);
        geo.addImage(gameoverImage)
        geo.scale=0.5
          }
  
  
  

  drawSprites();

function fruits(){
  banana=createSprite(670,Math.round(random(170,220)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-5
  FoodGroup.add(banana)
}

function stones(){
  obstacle=createSprite(400,320,5,5)
  obstacle.debug=true
  
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-6;
  obstacle.scale=0.2  
  obstacleGroup.add(obstacle)
}






}
