document.addEventListener('DOMContentLoaded', () => {

    // 1. INTRO SVG ANIMATION (Typewriter Path + Stroke drawing)
    const heartPath = document.querySelector('.heart-path');
    const clickHint = document.getElementById('click-hint');
    const introScreen = document.getElementById('intro-screen');
    const mainCastle = document.getElementById('main-castle');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const letterModal = document.getElementById('letter-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Draw SVG using anime.js
    anime({
        targets: heartPath,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 3500,
        direction: 'alternate',
        loop: false,
        begin: function () {
            heartPath.setAttribute('fill', 'none');
        },
        complete: function () {
            heartPath.setAttribute('fill', 'rgba(255, 77, 109, 0.2)');
            clickHint.style.display = 'block';
        }
    });

    // 2. Transition from SVG to Castle
    introScreen.addEventListener('click', () => {
        // Hide intro, show castle
        introScreen.style.display = 'none';
        mainCastle.style.display = 'flex';
        // Initialize magic dust
        initMagicDust();
    });

    // 3. Envelope interaction
    envelopeWrapper.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');

        // Wait for open animation to semi-finish before popping modal
        setTimeout(() => {
            letterModal.style.display = 'flex';
            // Slight delay for transition
            setTimeout(() => {
                letterModal.classList.add('show');
                startTypewriter();
            }, 50);
        }, 1200);
    });

    // Close Modal
    closeModalBtn.addEventListener('click', () => {
        letterModal.classList.remove('show');
        setTimeout(() => {
            letterModal.style.display = 'none';
            envelopeWrapper.classList.remove('open');
            stopTypewriter();
        }, 500); // Wait for transition
    });

    // 4. Typewriter Effect Logic
    const titleText = "Địch cái con cụ Hoàng Anh";
    const bodyText = "Shipaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    let titleElement = document.getElementById('modal-title');
    let bodyElement = document.getElementById('modal-body');
    let typeInterval1;
    let typeInterval2;

    function startTypewriter() {
        // Clear text before starting
        titleElement.innerHTML = '';
        bodyElement.innerHTML = '';
        let i = 0;
        let j = 0;

        // Type Title
        typeInterval1 = setInterval(() => {
            if (i < titleText.length) {
                titleElement.innerHTML += titleText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval1);
                // Start typing body
                setTimeout(() => {
                    typeInterval2 = setInterval(() => {
                        if (j < bodyText.length) {
                            bodyElement.innerHTML += bodyText.charAt(j);
                            j++;
                        } else {
                            clearInterval(typeInterval2);
                        }
                    }, 50); // Speed of body typing
                }, 300);
            }
        }, 80); // Speed of title typing
    }

    function stopTypewriter() {
        clearInterval(typeInterval1);
        clearInterval(typeInterval2);
    }

    // 5. Magic Dust Logic
    function initMagicDust() {
        const head = document.getElementsByTagName('head')[0];
        let animationId = 1;

        // Create magic dust particle
        function CreateMagicDust(x1, x2, y1, y2, sizeRatio, fallingTime, animationDelay) {
            let dust = document.createElement('span');
            let animation = document.createElement('style');
            animation.innerHTML = `
            @keyframes blink${animationId} {
                0% { top: ${y1}px; left: ${x1}px; width: ${2 * sizeRatio}px; height: ${2 * sizeRatio}px; opacity: .4; }
                20% { width: ${4 * sizeRatio}px; height: ${4 * sizeRatio}px; opacity: .8; }
                35% { width: ${2 * sizeRatio}px; height: ${2 * sizeRatio}px; opacity: .5; }
                55% { width: ${3 * sizeRatio}px; height: ${3 * sizeRatio}px; opacity: .7; }
                80% { width: ${sizeRatio}px; height: ${sizeRatio}px; opacity: .3; }
                100% { top: ${y2}px; left: ${x2}px; width: 0px; height: 0px; opacity: .1; }
            }`;
            head.appendChild(animation);
            dust.classList.add('dustDef');
            dust.style.animation = `blink${animationId++} ${fallingTime}s cubic-bezier(.71, .11, .68, .83) infinite ${animationDelay}s`;

            // Append to body so they float freely
            document.body.appendChild(dust);
        }

        // Generate widespread random dust points based on screen size
        const w = window.innerWidth;
        const h = window.innerHeight;

        // Randomly generate 25 dust particles that fall across the screen slowly
        for (let i = 0; i < 25; i++) {
            let startX = Math.random() * w;
            let endX = startX + (Math.random() * 100 - 50); // slight drift
            let startY = Math.random() * (h / 2); // start mostly in upper half
            let endY = startY + Math.random() * 200 + 100; // fall down
            let size = Math.random() * 1.5 + 0.5;
            let fallTime = Math.random() * 4 + 3; // 3-7s duration
            let delay = Math.random() * 2;

            CreateMagicDust(startX, endX, startY, endY, size, fallTime, delay);
        }
    }
});
