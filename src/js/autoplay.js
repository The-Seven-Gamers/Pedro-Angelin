function videoLoaded() {
    if (document.getElementById("video").muted == true) {
        document.getElementById("video").muted = false;
    }

    if (document.getElementById("video").paused == true) {
        document.getElementById("video").play();
    }
}