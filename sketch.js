let trex;
let trexRunning;
let trexCollided;
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
let gameOver;
let gameOverImg;
let restart;
let restartImg;
let jumpSound;
let checkPointSound;
let dieSound;
let nextCheckPoint = 1000;

function preload() {
    trexRunning = loadAnimation("trex1.png", "trex2.png", "trex3.png");
    trexCollided = loadAnimation("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudImg = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3= loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg =  loadImage("restart.png");

    jumpSound = loadSound("jump.mp3");
    checkPointSound = loadSound("checkPoint.mp3");
    dieSound = loadSound("die.mp3");
}

function setup() {
    createCanvas(600, 200);

    trex = createSprite(50, 160, 20, 50);
    trex.addAnimation("running", trexRunning);
    trex.addAnimation("collided",trexCollided)
    trex.scale = 0.5;
    trex.x = 50;

    ground = createSprite(200, 180, 400, 20);
    ground.addImage("ground", groundImage);

    invisibleGround = createSprite(200, 190, 400, 10);
    invisibleGround.visible = false;

    obstaclesGroup = new Group();
    cloudsGroup = new Group();

    trex.setCollider("circle",0,0,40)
    trex.debug = true;

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    restart = createSprite(300,140);
    restart.addImage(restartImg);
    restart.scale = 0.5;
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
        if (score >= nextCheckPoint){
            checkPointSound.play();
            nextCheckPoint += 1000;
        }
        if(keyDown("space") && trex.y >= 160) {
            trex.velocityY =-12;
            jumpSound.play();
        }
        trex.velocityY = trex.velocityY + 0.8;
        spawnClouds();
        spawnObstacles();
        if(obstaclesGroup.isTouching(trex)){
            gameState = END;
            dieSound.play();
            trex.velocityY = -12;
            jumpSound.play();
        }

        gameOver.visible = false;
        restart.visible = false;
    }
    else if(gameState === END){
        ground.velocityX = 0;
        trex.changeAnimation("collided",trexCollided)
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        trex.velocityY = 0
        gameOver.visible = true;
        restart.visible = true;
        if (mousePressedOver(restart)){
            reset();
        }

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
        obstacle.velocityX = -(4+3*score/1000);
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

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("running", trexRunning);
    score = 0;  
}