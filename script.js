let count = true;

const play = (t, s) => {
  var timerval = t;
  var leveluptimeval = t;
  var score = s;
  var cross = 100;
  var hitrn = 0;
  var home = false;
  var levelNo = 0;
  var highscore = localStorage.getItem("Highscore")
    ? localStorage.getItem("Highscore")
    : 0;
  document.querySelector("#highscoreval").textContent = highscore;
  document.querySelector("#levelno").textContent = levelNo;

  const handlePlayAgain = () => {
    document.querySelector("#playagain").addEventListener("click", () => {
      document.querySelector(".over").style.display = "none";
      document.querySelector(".pbtm").style.display = "flex";
      levelNo = 0
      play(60, 0);
    });
  };

  const getHitValue = () => {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
  };

  const getIncreaseScoreValue = () => {
    score += 10;
    if (highscore < score) {
      highscore = score;
      document.querySelector("#highscoreval").textContent = highscore;
    }
    document.querySelector("#scoreval").textContent = score;
  };

  const getDecreaseScoreValue = () => {
    score -= 10;
    if (highscore < score) {
      highscore = score;
      document.querySelector("#highscoreval").textContent = highscore;
    }
    document.querySelector("#scoreval").textContent = score;
  };

  const getRandomColor = () => {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    return color.padStart(6, "0"); // Ensure the color string is always 6 characters long
  };

  const isCloseToWhiteOrBlack = (color) => {
    // Convert hex color to RGB
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    // Calculate brightness
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 200 || brightness < 55; // Close to white or black
  };

  const bubbles = () => {
    let bubble = "";

    for (let i = 0; i <= 160; i++) {
      let num = Math.floor(Math.random() * 10);
      let color = getRandomColor();
      if (isCloseToWhiteOrBlack(color)) {
        color = "00FFFF"; // Cyan color in hex
      }
      bubble += `<div class="bubble" style="
      background-color:#${color};color:inherit;">
                    ${num}
                </div>`;
    }
    document.querySelector(".pbtm").innerHTML = bubble;
  };

  const timer = () => {
    const timeInterval = setInterval(() => {
      if (home) {
        clearInterval(timeInterval);
        timerval = 0;
        document.querySelector("#time").textContent = timerval;
        document.querySelector("#hitval").textContent = 0;
      }
      if (timerval > 0) {
        timerval--;
        document.querySelector("#time").textContent = timerval;
      } else {
        clearInterval(timeInterval);
        document.querySelector(".pbtm").innerHTML = "";
        document.querySelector(".pbtm").style.display = "none";
        document.querySelector(".over").style.display = "flex";
        document.querySelector(".over").style.opacity = 1;
        document.querySelector("#finalscoreval").textContent = score;
        if (highscore < score) {
          highscore = score;
          localStorage.setItem("Highscore", highscore);
        } 
          score = 0;
          localStorage.setItem("Highscore", highscore);
          document.querySelector("#scoreval").textContent = score;
     

        handlePlayAgain();
      }
    }, 1000);
  };

  const gotohome = () => {
    document.querySelector("#home").addEventListener("click", () => {
      document.querySelector(".pbtm").style.display = "none";
      document.querySelector(".enter").style.display = "flex";
      home = true;
      score = 0;
      hitrn = 0;
    });
  };

  const checkLevelUp = () => {
    if (score > cross) {
      levelNo += 1;
      timerval = Math.max(10, leveluptimeval - 10);
      leveluptimeval = Math.max(10, leveluptimeval - 10);
      document.querySelector("#levelno").textContent = levelNo;
      bubbles(); 
      score = 0;
      cross += 50;
    }
  };

  const handleClickOnBubble = () => {
    document.querySelector(".pbtm").addEventListener("click", (e) => {

      if (!e.target.classList.contains("bubble")) {
        return; // Only respond if the clicked element is a bubble
      }
      
      var clickedNum = Number(e.target.textContent);

      if (clickedNum === hitrn) {
        getIncreaseScoreValue();
        getHitValue();
        bubbles();
        checkLevelUp();
      } else {
        getDecreaseScoreValue();
      }
    });
  };

  bubbles();
  setTimeout(() => {
    timer();
    getHitValue();
    handleClickOnBubble();
  }, 4000);
  gotohome();
};

const entergame = () => {
  document.querySelector("#play").addEventListener("click", () => {
    document.querySelector(".enter").style.display = "none";
    document.querySelector(".pbtm").style.display = "flex";
    play(60, 0);
  });
};

const rules = () => {
  document.querySelector("#rule").addEventListener("click", () => {
    if (count) {
      document.querySelector(".rule-cont").style.display = "flex";
      document.querySelector(".rule-cont").classList.remove("disappear");
      count = false;
    } else {
      document.querySelector(".rule-cont").classList.add("disappear");
      setTimeout(() => {
        document.querySelector(".rule-cont").style.display = "none";
      }, 2000);
      count = true;
    }
  });
};

// gotohome()
entergame();
rules();
