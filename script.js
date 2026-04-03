let videoStarted = false;
let finalAudio = new Audio("sounds/final.mp3");

/* 🔁 INIT */
function initPage(){
    document.getElementById("introScreen").style.display = "flex";
    document.querySelector(".home").style.display = "none";
    document.getElementById("candleScreen").style.display = "none";
    document.getElementById("storySection").style.display = "none";
}

function startTimer(){

    document.getElementById("timerScreen").style.display = "flex";

    let time = 5;
    const countdown = document.getElementById("countdown");

    const timer = setInterval(()=>{
        countdown.innerText = time + " ❤️";
        time--;

        if(time < 0){
            clearInterval(timer);

            document.getElementById("timerScreen").style.display = "none";
            document.getElementById("candleScreen").style.display = "flex";
        }
    },1000);
}
/* 🎂 BLOW CANDLE → HOME */
function blowCandle(){

    document.getElementById("wishMsg").innerText = "Your wish is my command 💖";

    confetti({
        particleCount: 150,
        spread: 80
    });

    setTimeout(()=>{

        document.getElementById("candleScreen").style.display = "none";
        document.querySelector(".home").style.display = "flex";

    },2000);
}

/* 🎉 START CELEBRATION → STORY + VIDEO */
function startCelebration(){

    document.querySelector(".home").style.display = "none";
    document.getElementById("storySection").style.display = "block";

    const video = document.getElementById("bgVideo");

    if(video && !videoStarted){
        video.style.display = "block";

        video.play()
        .then(()=>{
            video.volume = 0.5;
        })
        .catch(err=>{
            console.log("Video blocked:", err);
        });

        videoStarted = true;
    }

    window.scrollTo(0,0);

    confetti({
        particleCount: 200,
        spread: 100
    });

    showOnScroll();
}

/* 🌟 SCROLL */
function showOnScroll(){
    const faders = document.querySelectorAll('.fade');
    const triggerBottom = window.innerHeight * 0.85;

    faders.forEach(fade => {
        const top = fade.getBoundingClientRect().top;

        if(top < triggerBottom){
            fade.classList.add('show');
        }
    });
}

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

/* 💖 HEARTS */
function createHearts(){
    const container = document.querySelector(".hearts");

    setInterval(() => {
        const heart = document.createElement("span");
        heart.innerHTML = "💖";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 300);
}

/* 💖 NAME FLOAT */
function startNameFloating(){

    const container = document.querySelector(".nameFloat");

    setInterval(() => {

        const name = document.createElement("span");

        name.innerText = "💖 Karthick 💖 Abarnaa 💖";

        name.style.left = Math.random() * 100 + "vw";
        name.style.animationDuration = (Math.random() * 4 + 4) + "s";
        name.style.fontSize = (Math.random() * 10 + 18) + "px";

        container.appendChild(name);

        setTimeout(()=>{
            name.remove();
        },8000);

    }, 400);
}

/* 💖 LOVE COUNTER FIX */
function updateLoveCounter(){

    const startDate = new Date("2020-12-31T00:00:00");

    function calculate(){
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        if(days < 0){
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if(months < 0){
            years--;
            months += 12;
        }

        const counter = document.getElementById("loveCounter");

        if(counter){
            counter.innerHTML =
            `💖 ${years} Years ${months} Months ${days} Days 💖<br>
             Together Forever 💑`;
        }
    }

    calculate();
    setInterval(calculate, 60000);
}

/* 🔥 FINAL SURPRISE BUTTON CHANGE (ONLY ONE FUNCTION NOW) */
function openFinalPage(){

    document.getElementById("proposalPage").style.display = "flex";

    moveNoButton();
}

function moveNoButton(){

    const noBtn = document.getElementById("noBtn");
    const text = document.getElementById("proposalText");

    // 🔊 sound
    const audio = new Audio("sounds/hehe.mp3");

    noBtn.style.position = "absolute";

    document.addEventListener("mousemove", (e) => {

        const rect = noBtn.getBoundingClientRect();

        const distance = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width/2), 2) +
            Math.pow(e.clientY - (rect.top + rect.height/2), 2)
        );

        if(distance < 120){

            // 😂 button run
            const x = Math.random() * (window.innerWidth - 120);
            const y = Math.random() * (window.innerHeight - 60);

            noBtn.style.left = x + "px";
            noBtn.style.top = y + "px";

            // 🔊 sound play
            audio.currentTime = 0;
            audio.play();

            // 😈 tease text change
            text.innerText = "Try pannalum NO press panna mudiyathu 😏";
        }
    });

    // 😭 click try panna alert
    noBtn.addEventListener("click", () => {
        alert("No ah press panna mudiyathu 😜");
    });
}
/* 💖 YES CLICK → FINAL PAGE */
function acceptedLove(){

    document.getElementById("proposalPage").style.display = "none";
    document.getElementById("finalSurprise").style.display = "flex";

    // 🔊 AUDIO PLAY (IMPORTANT)
    finalAudio.currentTime = 0;
    finalAudio.play().catch(err => {
        console.log("Audio blocked:", err);
    });

    createHearts();
    startNameFloating();

    setInterval(() => {
        confetti({
            particleCount: 100,
            spread: 70
        });
    }, 2000);
}
function checkLoveDate(){

    const input = document.getElementById("loveInput").value.trim();
    const error = document.getElementById("errorMsg");

    if(input === "31.12.2020"){

        error.innerText = "💖 Correct... Welcome my love 💖";

        setTimeout(()=>{
            document.getElementById("introScreen").style.display = "none";
            startTimer(); // ✅ now works
        },1000);

    } else {
        error.innerText = "Wrong date 😡 Try again my love 💔";
    }
}
