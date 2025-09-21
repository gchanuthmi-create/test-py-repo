document.addEventListener("DOMContentLoaded", () => {
  // NAV TOGGLE
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }

  /* BREATHING */
  const circle = document.getElementById("breathingCircle");
  const breathingText = document.getElementById("breathingText");
  const startBreathingBtn = document.getElementById("startBreathing");
  let breatheInterval = null;
  let breathePhase = 0;

  function breatheStep() {
    if (breathePhase === 0) {
      breathingText.textContent = "Inhale...";
      circle.style.transform = "scale(1.25)";
    } else if (breathePhase === 1) {
      breathingText.textContent = "Hold...";
    } else {
      breathingText.textContent = "Exhale...";
      circle.style.transform = "scale(1)";
    }
    breathePhase = (breathePhase + 1) % 3;
  }

  function startBreathing() {
    startBreathingBtn.textContent = "Stop Breathing";
    breathePhase = 0;
    breatheStep();
    breatheInterval = setInterval(breatheStep, 4000);
  }

  function stopBreathing() {
    startBreathingBtn.textContent = "Start Breathing";
    breathingText.textContent = "Press start to begin";
    circle.style.transform = "scale(1)";
    clearInterval(breatheInterval);
    breatheInterval = null;
  }

  if (startBreathingBtn) {
    startBreathingBtn.addEventListener("click", () => {
      if (breatheInterval) stopBreathing();
      else startBreathing();
    });
  }

  /* TIMER */
  const timerSelect = document.getElementById("timerSelect");
  const startTimerBtn = document.getElementById("startTimer");
  const timerDisplay = document.getElementById("timerDisplay");
  const sessionCountEl = document.getElementById("sessionCount");

  let timerInterval = null;
  let remainingSeconds = 0;
  let sessions = parseInt(localStorage.getItem("mindSessions") || "0", 10) || 0;

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  }

  function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(Math.max(0, remainingSeconds));
  }

  function updateSessionCount() {
    sessionCountEl.textContent = `You have completed ${sessions} session${sessions !== 1 ? "s" : ""}.`;
  }
  updateSessionCount();

  function stopTimer(finished = false) {
    clearInterval(timerInterval);
    timerInterval = null;
    startTimerBtn.textContent = "Start";
    if (finished) {
      sessions++;
      localStorage.setItem("mindSessions", String(sessions));
      updateSessionCount();
      alert("Session complete! 🎉");
    }
  }

  if (startTimerBtn) {
    startTimerBtn.addEventListener("click", () => {
      if (timerInterval) {
        stopTimer(false);
        timerDisplay.textContent = "00:00";
        return;
      }
      remainingSeconds = parseInt(timerSelect.value, 10);
      if (remainingSeconds <= 0) return;
      startTimerBtn.textContent = "Stop";
      updateTimerDisplay();
      timerInterval = setInterval(() => {
        remainingSeconds--;
        updateTimerDisplay();
        if (remainingSeconds < 0) {
          stopTimer(true);
          timerDisplay.textContent = "00:00";
        }
      }, 1000);
    });
  }

  /* SOUNDS */
  const soundUrls = {
    rain: "sounds/calming-rain-257596 (1).mp3",
    ocean: "sounds/ocean-waves-266187.mp3",
    birds: "sounds/birds-chirping-75156.mp3"
  };
  const soundButtons = document.querySelectorAll(".sound-btn");
  const sounds = {};
  let currentPlaying = null;

  function createAudio(key) {
    if (sounds[key]) return sounds[key];
    const a = new Audio(soundUrls[key]);
    a.loop = true; a.preload="auto"; a.volume=0.6;
    sounds[key] = a;
    return a;
  }

  soundButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.sound;
      const audio = createAudio(key);
      if (currentPlaying && currentPlaying !== key) {
        sounds[currentPlaying].pause();
      }
      if (audio.paused) {
        audio.play();
        currentPlaying = key;
      } else {
        audio.pause();
        currentPlaying = null;
      }
    });
  });

  /* NEWSLETTER */
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("newsletter-email").value.trim();
      if (!email.includes("@")) { alert("Please enter a valid email."); return; }
      localStorage.setItem("greenbyte_newsletter", email);
      alert("Thanks — you're subscribed!");
    });
  }
});
