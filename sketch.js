let trex;
let trexRunning;

function preload(){
    trexRunning = loadAnimation("trex1.png", "trex3.png","trex4.png" );
}

function setup(){
    createCanvas(600,200);
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trexRunning);
}

function draw(){
    background("white");
    drawSprites();
}