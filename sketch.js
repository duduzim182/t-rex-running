let trex;
let trexRunning;
let ground;
let groundImage;
let invisibleGround;
let cloud;
let cloudImg;
let cloudsGroup;

function preload() {
    trexRunning = loadAnimation("trex1.png", "trex2.png", "trex3.png");
    groundImage = loadImage("ground2.png");
    cloudImg = loadImage("cloud.png");

}

function setup() {
    createCanvas(600, 200);

    trex = createSprite(50, 160, 20, 50);
    trex.addAnimation("running", trexRunning);
    trex.scale = 0.5;
    trex.x = 50;

    ground = createSprite(200, 180, 400, 20);
    ground.addImage("ground", groundImage);

    invisibleGround = createSprite(200, 190, 400, 10);
    invisibleGround.visible = false;
}

function draw() {
    background("white");

    if(keyDown("space") && trex.y >= 160) {
        trex.velocityY =-10;
    };

    trex.velocityY = trex.velocityY + 0.8;

    trex.collide(invisibleGround);

    ground.velocityX = -2;
    if(ground.x < 0) {
        ground.x = ground.width/2;
    }

    spawnClouds();
    
    drawSprites();

}

function spawnClouds(){
    if (frameCount % 60 == 0){
        cloud = createSprite(600,100,40,10);
        cloud.addImage(cloudImg);
        cloud.scale = 0.4;
        cloud.velocityX = -3;
        cloud.y = Math.round(random(10,60));
        cloud.depth=trex.depth;
        trex.depth += 1;
    }
}