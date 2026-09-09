const canvasElement = document.getElementById("gameCanvas");
const canvas = canvasElement.getContext("2d");

const player = {
    x: 800/2,
    y: 600/2,
    w: 50,
    h: 50,
    xSpeed: 0,
    ySpeed: 0,
}

addEventListener("keydown", (e) => {
    if (e.repeat) return;

    e.preventDefault();

    const key = e.key.toLowerCase();
    console.log(key);

    if (key === "a" || key === "arrowleft") {
        player.xSpeed = -20;
    }
    else if (key === "d" || key === "arrowright") {
        player.xSpeed = 20;
    }
    else if (key === "w" || key === "arrowup") {
        player.ySpeed = -20;
    }
    else if (key === "s" || key === "arrowdown") {
        player.ySpeed = 20;
    }
});

addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();

    e.preventDefault();

    if (key === "a" || key === "arrowleft") {
        player.xSpeed = 0;
    }
    else if (key === "d" || key === "arrowright") {
        player.xSpeed = 0;
    }
    else if (key === "w" || key === "arrowup") {
        player.ySpeed = 0;
    }
    else if (key === "s" || key === "arrowdown") {
        player.ySpeed = 0;
    }
});

function drawPlayer(playerObject) {
    canvas.fillRect(
        playerObject.x,
        playerObject.y,
        playerObject.w,
        playerObject.h
    );
}

function loop() {
    canvas.clearRect(0, 0, 800, 600);
    player.x += player.xSpeed;
    player.y += player.ySpeed;
    drawPlayer(player);
    requestAnimationFrame(loop);
}

loop();