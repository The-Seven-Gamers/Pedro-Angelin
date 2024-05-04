const btn = document.getElementById("btn");
    const audio = document.querySelector("video");
    const visualizer = document.querySelector(".visualizer");

    var feur = 0;
    
    function init() { 
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new window.AudioContext();
        const analyser = ctx.createAnalyser();
        const source = ctx.createMediaElementSource(audio);
        source.connect(analyser);
        source.connect(ctx.destination);
        analyser.fftSize = 128;
        const bufferLength = analyser.frequencyBinCount;

        let dataArray = new Uint8Array(bufferLength);
        let elements = [];
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
                item = (item-80); //------------------------------------
                console.log(item);
                elements[i].style.transform = `rotateZ(${i * (360 / bufferLength)}deg) translate(calc(${clamp(item, 0, 120)}*0.05em + min(20vh, 20vw)), 0)`;
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
    });