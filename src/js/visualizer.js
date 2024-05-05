const btn = document.getElementById("btn");
    const audio = document.querySelector("video");
    const visualizer = document.querySelector(".visualizer");
    const txt = document.querySelector("p");

    var feur = 0;
    
    function init() { 
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new window.AudioContext();
        const analyser = ctx.createAnalyser();
        const source = ctx.createMediaElementSource(audio);
        source.connect(analyser);
        source.connect(ctx.destination);
        analyser.fftSize = 64;
        var bufferLength = analyser.frequencyBinCount;

        let dataArray = new Uint8Array(bufferLength);
        let elements = [];
        bufferLength = 22; // for the pedro pedro remix because it is more esthetical
        // (the quality is bad so no sound in the end)
        for (let i=0; i<bufferLength; i++) {
            const element = document.createElement('span');
            element.classList.add('element');
            elements.push(element);
            visualizer.appendChild(element);
        }

        const clamp = (num, min, max) => {
            if (num >= max) return max;
            if (num <= min) return min;
            return num;
        }

        const update = () => {
            requestAnimationFrame(update);
            analyser.getByteFrequencyData(dataArray);
            for (let i=0; i<bufferLength; i++) {
                let item = dataArray[i];
                item = (item-80)^2+20; //------------------------------------
                // this if is used for the pedro pedro remix
                // it is more esthetical like this
                if (i in [0,1,2,3]) {
                    item -= 100 - 20*i;
                }
                elements[i].style.transform = `rotateZ(${i * (360 / bufferLength)}deg) translate(calc(${clamp(item, 0, 130)}*min(0.15vh, 0.2vw) + min(20vh, 20vw)), 0)`;
            }
        };
        update();
    }

    //audio = video
    audio.addEventListener("click", e => {
        if (feur == 0) {
            feur = 1;
            init();
        }
        txt.style.display = "none";
    });