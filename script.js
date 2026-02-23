(function () {
  var startBtn = document.getElementById("startBtn");
  var playBtn = document.getElementById("playBtn");
  var audio = document.getElementById("audio");
  var barFill = document.getElementById("barFill");
  var timeLabel = document.getElementById("timeLabel");
  var messageBtn = document.getElementById("messageBtn");
  var hiddenMsg = document.getElementById("hiddenMsg");

  // Smooth jump down on start
  startBtn.addEventListener("click", function () {
    window.scrollTo({ top: window.innerHeight * 0.92, behavior: "smooth" });
  });

  // Reveal on scroll
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function revealCheck() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < revealEls.length; i++) {
      var r = revealEls[i].getBoundingClientRect();
      if (r.top < vh - 80) {
        revealEls[i].classList.add("show");
      }
    }
  }
  window.addEventListener("scroll", revealCheck);
  window.addEventListener("load", revealCheck);
  revealCheck();

  // Audio controls (iPhone requires user gesture - button click is perfect)
  function formatTime(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  playBtn.addEventListener("click", function () {
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      playBtn.textContent = "Pause";
    } else {
      audio.pause();
      playBtn.textContent = "Play";
    }
  });

  audio.addEventListener("timeupdate", function () {
    var dur = audio.duration || 0;
    var cur = audio.currentTime || 0;
    var pct = dur ? (cur / dur) * 100 : 0;
    barFill.style.width = pct.toFixed(2) + "%";
    timeLabel.textContent = formatTime(cur);
  });

  audio.addEventListener("ended", function () {
    playBtn.textContent = "Play";
  });

  // Final hidden message
  messageBtn.addEventListener("click", function () {
    hiddenMsg.style.display = "block";
    hiddenMsg.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();