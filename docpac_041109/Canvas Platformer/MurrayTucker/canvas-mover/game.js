const canvasElement = document.getElementById("gameCanvas");
const canvas = canvasElement.getContext("2d");

const maxSpeed = 10;
const jumpForce = 30;
const gravity = 3;

const player = {
    x: 800/2,
    y: 600/2,
    width: 50,
    height: 50,
    xSpeed: 0,
    ySpeed: 0
}

const obstacles = [
    { x: 200, y: 500, width: 400, height: 30 },
    { x: 100, y: 0, width: 25, height: 600 },
    { x: 700, y: 0, width: 25, height: 600 }
]

addEventListener("keydown", (e) => {
    if (e.repeat) return;

    const key = e.key.toLowerCase();

    if (key.startsWith("arrow")) {    
        e.preventDefault();
    }

    if (key === "a" || key === "arrowleft") {
        player.xSpeed += -maxSpeed;
    }
    else if (key === "d" || key === "arrowright") {
        player.xSpeed += maxSpeed;
    }
    else if (key === " " && player.y === canvasElement.height - player.height) {
        player.ySpeed = -jumpForce;
    }
});

addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();

    if (key.startsWith("arrow")) {    
        e.preventDefault();
    }

    if (key === "a" || key === "arrowleft") {
        player.xSpeed -= -maxSpeed;
    }
    else if (key === "d" || key === "arrowright") {
        player.xSpeed -= maxSpeed;
    }
});

function loop() {
    canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
    player.x += player.xSpeed;
    player.y += player.ySpeed;
    player.ySpeed += gravity;
    player.x = Math.min(Math.max(player.x, 0), canvasElement.width - player.width);
    player.y = Math.min(Math.max(player.y, 0), canvasElement.height - player.height);
    
    if (player.y === canvasElement.height - player.height) {
        player.ySpeed = 0;   
    }

    handleObstacleCollisions();
    drawPlayer(player);
    drawObstacles(obstacles);
    requestAnimationFrame(loop);
}
// Run game loop
loop();

function handleObstacleCollisions() {
    for (const obstacle of obstacles) {
        if (checkAABBCollision(player, obstacle)) {
            // left, right
            const overlapPlayerLObstacleR = obstacle.width - (player.x - obstacle.x);
            const overlapPlayerRObstacleL = (obstacle.x - player.x) - player.width;
            // top, bottom
            const overlapPlayerTObstacleB = obstacle.height - (player.y - obstacle.y);
            const overlapPlayerBObstacleT = (obstacle.y - player.y) - player.height;

            const lowestLeftRight = overlapPlayerLObstacleR < Math.abs(overlapPlayerRObstacleL) ? overlapPlayerLObstacleR : overlapPlayerRObstacleL;
            const lowestTopBottom = overlapPlayerTObstacleB < Math.abs(overlapPlayerBObstacleT) ? overlapPlayerTObstacleB : overlapPlayerBObstacleT;

            if (Math.abs(lowestLeftRight) < Math.abs(lowestTopBottom)) {
                player.x += lowestLeftRight;
                xSpeed = 0;
            }
            else {
                player.y += lowestTopBottom;
                player.ySpeed = 0;
            }
        }
    }
}

function checkAABBCollision(box1, box2) {
    return (
        box1.x < box2.x + box2.width  &&
        box1.x + box1.width > box2.x  &&
        box1.y < box2.y + box2.height &&
        box1.y + box1.height > box2.y
    );
}

function drawPlayer(playerObject) {
    canvas.fillRect(
        playerObject.x,
        playerObject.y,
        playerObject.width,
        playerObject.height
    );
}

function drawObstacles(obstacleArray) {
    for (const obstacle of obstacleArray) {
        canvas.fillRect(
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
        )
    }
}
