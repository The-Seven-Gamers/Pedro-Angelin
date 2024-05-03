// rotate every 30ms in a loop
var deg = 0;
var direction = true;
var speed = 0;
setInterval(function() {
    if (0 == Math.floor(Math.random()*300)) {
        direction = !direction;
    }
    if (direction) {
        speed = speed + Math.random()*0.01;
    } else {
        speed = speed - Math.random()*0.01;
    }

    // speed cap (-0.7 to 0.7)
    if (speed < -0.4) {
        speed = -0.4;
    }
    if (speed > 0.4) {
        speed = 0.4;
    }

    deg = deg + speed;
    document.getElementById("video").style.transform = "rotate("+deg+"deg)";
}, 16);