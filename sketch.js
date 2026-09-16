let trex;
let trexRunning;
let ground;
let groundImage;
let invisibleGround;
let cloud;
let cloudImg;
let cloudsGroup;
let obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
let obstaclesGroup;
let score = 0;
const PLAY = 1;
const END = 0;
let gameState = PLAY;

function preload() {
    trexRunning = loadAnimation("trex1.png", "trex2.png", "trex3.png");
    groundImage = loadImage("ground2.png");
    cloudImg = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3= loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");

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

    obstaclesGroup = new Group();
    cloudsGroup = new Group();
}

function draw() {
    background("white");

    text("score: "+score,500,50);


    if (gameState === PLAY){
        ground.velocityX = -4;
        if(ground.x < 0) {
            ground.x = ground.width/2;
        }
        score = score+Math.round(frameCount/60);
        if(keyDown("space") && trex.y >= 160) {
            trex.velocityY =-11;
        }
        trex.velocityY = trex.velocityY + 0.8;
        spawnClouds();
        spawnObstacles();
        if(obstaclesGroup.isTouching(trex)){
            gameState = END;
        }
    }
    else if(gameState === END){
        ground.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);

    }


    trex.collide(invisibleGround);

    
    drawSprites();

}

function spawnClouds(){
    if (frameCount % 60 == 0){
        cloud = createSprite(600,100,40,10);
        cloud.addImage(cloudImg);
        cloud.scale = 0.4;
        cloud.velocityX = -3;
        cloud.y = Math.round(random(10,60));
        cloud.lifetime = 600/3;
        cloud.depth=trex.depth;
        trex.depth += 1;
        cloudsGroup.add(cloud);

    }
}

function spawnObstacles(){
    if(frameCount % 60 == 0){
        let obstacle = createSprite(600,165,10,40);
        obstacle.velocityX = -6;
        let rand = Math.round(random(1,6));
        switch(rand){
            case 1 :
                obstacle.addImage(obstacle1);
                break;
            case 2 :
                obstacle.addImage(obstacle2);
                break;
            case 3 :
                obstacle.addImage(obstacle3);
                break;
            case 4 :
                obstacle.addImage(obstacle4);
                break;
            case 5 :
                obstacle.addImage(obstacle5);
                break;
            case 6 :
                obstacle.addImage(obstacle6);
                break;
            default:
                break;
        }
        obstacle.scale = 0.5;
        obstacle.lifetime = 600/6
        obstaclesGroup.add(obstacle);
    }
}