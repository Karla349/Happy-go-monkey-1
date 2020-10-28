var monkey, monkey_running;
var banana, bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
 
  survivalTime=0;

   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.09;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);

  FoodGroup = new Group();
  obstaclesGroup = new Group();

   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
}

function draw() {
  
  background(255);
  
  text("Survival Time: "+ survivalTime , 100,50);
    
  if(gameState===PLAY){
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
    
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  stroke("black");
  textSize(20);
  fill("black");
    
survivalTime=Math.ceil(frameCount/frameRate()) 
    
  if(obstaclesGroup.isTouching(monkey)){
    
          gameState=END;
 }
} 
  
  else if(gameState===END){
  ground.velocityX = 0;
  monkey.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
}
   
  drawSprites();
}

function spawnFood() {
  
if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
  
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    banana.addImage(bananaImage);
    banana.scale=0.07;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
     
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
       
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}