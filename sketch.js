
var PLAY = 1;
var END = 0;
var gameState = 1;



var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,height-10,width,100);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,height-50,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  
  if((touches.length>0 || world.mouseX && boy.x >= height-100))
  { boy.velocityX=-10;
   touches = [];
    
  }
  
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      cashG.setVelocityYEach(0);
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach(0);
      diamondsG.setVelocityYEach(0);
      treasureCollection=treasureCollection+1000;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach(0);
      jwelleryG .setVelocityYEach(0);
      treasureCollection=treasureCollection+100;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach(0);
        swordGroup.setVelocityYEach(0);
        boy.addAnimation("endImg",endImg);
       gameState=0;
  
    }
      
      
      
      
      
      
      
      
      
  }
 
  
  
  
  if (gameState === 0) {
     boy.velocityY=0;
     path.velocityY=0;
    
   swordGroup.setVelocityYEach(0);
     swordGroup.destroyEach(0);
    
  jwelleryG .setVelocityYEach(0);
    jwelleryG.destroyEach(0);
    
    diamondsG.setVelocityYEach(0);
     diamondsG.destroyEach(0);
    
    cashG.setVelocityYEach(0);
   cashG.destroyEach();
    
    boy.addAnimation("gameOver.png",endImg);
  }
  

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}