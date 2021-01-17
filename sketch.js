var ground;
var obstaclegroup,bananagroup;
var monkey,monkey_running,out;
var bananaImage,obstacleImage;
var FoodGroup, obstacleGroup;
var restart,restartimage;
var gamestate="play";
var score=0;
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  out=loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartimage=loadImage("restart.png");
}
function setup() {
  createCanvas(600,200);
  ground=createSprite(300,175,600,10)
  monkey=createSprite(50,135,10,10);
  monkey.scale=0.1;
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("out",out);
  restart=createSprite(200,50,10,10);
  restart.addAnimation("res",restartimage);
  restart.visible=0;
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}
function draw() {
  background(220);
  fill("green");
  text("Survival Time:"+ Math.round(score/10), 330,30); 
  monkey.collide(ground);
  if(gamestate=="play"){
     if(monkey.y>=130&&keyWentDown("space")){
        monkey.velocityY=-8;
      }
      monkey.velocityY+=0.4;
      if(ground.x<=0){
        ground.width/2;
      }
      if(frameCount>=70){
        score = score + Math.round(getFrameRate()/60);
      }
    if(monkey.isTouching(FoodGroup)){
        FoodGroup.destroyEach();
      } 
    if(monkey.isTouching(obstacleGroup)){
      gamestate="end";
    }
      spawnbanana();
      spawnobs();
  }
  if(gamestate=="end"){
     monkey.velocityY=10;
     monkey.changeAnimation("out",out);
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     fill("red");
     text("Press 'R' to restart",200,50);
     if(keyWentDown("r")){
       obstacleGroup.destroyEach();
       FoodGroup.destroyEach();
       monkey.changeAnimation("running",monkey_running);
       score=0;
       gamestate="play";
     }
  }
  drawSprites();
}
function spawnbanana(){
  if(frameCount % 70 == 0){
    var banana=createSprite(700,50,10,10);
    banana.y=Math.round(random(50,150));
    banana.addImage("banana",bananaImage);
    banana.scale=0.08;
    banana.velocityX=-(5 + score/10);
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(150);
    FoodGroup.setVelocityXEach(-(5 + score/20));
  }
}
function spawnobs(){
  if(frameCount % 70 == 0){
    var obs=createSprite(700,160,10,10);
    obs.addImage("obsimage",obstacleImage);
    obs.scale=0.1; 
    obstacleGroup.add(obs);
    obstacleGroup.setLifetimeEach(150);
    obstacleGroup.setVelocityXEach(-(5 + score/20));
  }
}