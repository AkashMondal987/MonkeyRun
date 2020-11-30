var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var fruitsGroup, obstaclesGroup;
var score, ground;
var survivalTime = 0;

function preload(){
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(600, 600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/5;
  console.log(ground.x);
  
  fruitsGroup = new Group();
  obstaclesGroup = new Group();
  
  survivalTime = 0;
  score = 0;
}

function draw() {
  background(255);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survival Time: "+ survivalTime, 100, 50);
  
  if(gameState === PLAY){
    
    if(ground.x<0){
      ground.x = ground.width/5;
    }
    if(keyDown("space")){
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 2;
    
}
  else if(gameState === END){
    monkey.desctroyEach();
    fruitsGroup.destroyEach();
    obstaclesGroup.destroyEach();
  }
  
  if(frameCount % 60 === 0){
    var banana = createSprite(600,165,10,40);
    banana.velocityX = -5;
    banana.addImage("banana", bananaImage);
    
    banana.scale = 0.1;
    banana.lifetime = 300;
    
    fruitsGroup.add(banana);
  }
  
  if(frameCount % 100 === 0){
    var obstacle = createSprite(400,325,20,20);
    obstacle.velocityX = -5;
    obstacle.addImage("obstacle", obstacleImage);
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
  
  monkey.collide(ground);
  
  drawSprites();
}