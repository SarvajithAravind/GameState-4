var HotAirBalloon, HotAirBalloonImg
var bird, birdImage
var Birds
var bg, bgImage
var building1, building1Image
var buidling2, building2Image
var PLAY = 1;
var END = 0;
var gameState = PLAY
var birdGroup, buildingGroup;
var birdStop;
var score = 0
var restart, restartImage

function preload() {
  HotAirBalloonImg = loadImage("Hot Air Balloon-1.png");
  bgImage = loadImage("background-1.png");
  birdImage = loadAnimation("bird-1.png", "bird-2.png", "bird-3.png", "bird-4.png", "bird-5.png", "bird-6.png", "bird-7.png", "bird-8.png");
  building1Image = loadImage("Building-1.png");
  building2Image = loadImage("Building-2.png");
  birdStop = loadAnimation("bird-1.png");
  restartImage = loadImage("Restart-1.png");

}

function setup() {
  createCanvas(800,700);
  bg = createSprite(400, 350, 800, 700);
  bg.scale = 1.5
  bg.addImage(bgImage);
  bg.velocityX = -3;
   HotAirBalloon = createSprite(150, 200, 50, 50);
   HotAirBalloon.addImage(HotAirBalloonImg);
   HotAirBalloon.scale = 0.25
   HotAirBalloon.debug = false
   HotAirBalloon.setCollider("circle", 0, -75, 300);
   birdGroup = new Group();
   buildingGroup = new Group();
   restart = createSprite(400, 350)
   restart.addImage(restartImage);
   restart.scale = 0.2
   restart.visible = false;
}



function draw() {
  background("yellow");  
  
  
  
  drawSprites();
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60)
    if(keyDown(UP_ARROW)){
      HotAirBalloon.y = HotAirBalloon.y - 5
    }
  
    if(keyDown(DOWN_ARROW)){
      HotAirBalloon.y = HotAirBalloon.y + 5
    }
    if(bg.x < 0){
      bg.x = bg.width/2;
    }
    spawnBirds();
    spawnBuilding();
    if(HotAirBalloon.isTouching(birdGroup)|| HotAirBalloon.isTouching(buildingGroup)){
      gameState = END;
    }
  }
  else if(gameState === END){
    bg.velocityX = 0;
    birdGroup.setVelocityXEach(0);
    
    buildingGroup.setVelocityXEach(0);
    birdGroup.setLifetimeEach(-1);
    buildingGroup.setLifetimeEach(-1);
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      gameState = PLAY;
      score = 0;
      restart.visible = false
      bg.velocityX = -3;
      birdGroup.destroyEach();
      buildingGroup.destroyEach();
    }
  }

  
  text("Score:" + score, 700, 100)
}
function spawnBirds(){
  if(frameCount % 150 === 0){
    var bird = createSprite(820, 200, 50, 50);
    bird.addAnimation("running", birdImage);
    bird.addAnimation("stops", birdStop);
    bird.velocityX = -5;
    bird.y = Math.round(random(80,400));
    bird.debug = false;
    bird.setCollider("circle", 0, 0, 30);
    bird.lifetime = 200
    birdGroup.add(bird);
    
  }
}

function spawnBuilding(){
  if(frameCount % 500 === 0){
    var building = createSprite(900, 500, 50, 50);
    var rand = Math.round(random(1, 2));
    switch(rand){
      case 1: building.addImage("standing", building1Image);
      building.setCollider("rectangle", 0, 0, 250, 475)
      building.scale = 0.75;
      break;
      case 2: building.addImage("standing2", building2Image);
      building.setCollider("rectangle", 0, 0, 200, 300);
      
      break;
      default: break;
      
    }
    building.lifetime = 1200;
    building.velocityX = -3;
    building.debug = false;
    buildingGroup.add(building);
    
  }
}