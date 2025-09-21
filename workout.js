document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => mainNav.classList.toggle("active"));
  }

  const workoutData = {
    arms: {
      none: ["Push-ups", "Tricep Dips"],
      dumbbells: ["Bicep Curls", "Shoulder Press"],
      bands: ["Band Curls", "Band Overhead Press"],
      kettlebell: ["Kettlebell Curls", "Kettlebell Press"],
      barbell: ["Barbell Curls", "Overhead Press"],
      mat: ["Plank Shoulder Taps", "Side Plank Rotations"]
    },
    legs: {
      none: ["Squats", "Lunges"],
      dumbbells: ["Deadlifts", "Goblet Squats"],
      bands: ["Band Squats", "Band Side Steps"],
      kettlebell: ["Kettlebell Goblet Squats", "Kettlebell Deadlifts"],
      barbell: ["Barbell Squats", "Barbell Lunges"],
      mat: ["Glute Bridges", "Wall Sits"]
    },
    full: {
      none: ["Burpees", "Mountain Climbers"],
      dumbbells: ["Thrusters", "Renegade Rows"],
      bands: ["Band Burpees", "Band Jacks"],
      kettlebell: ["Kettlebell Swings", "Turkish Get-ups"],
      barbell: ["Barbell Deadlifts", "Barbell Thrusters"],
      mat: ["Yoga Flow", "Pilates Roll-ups"]
    },
    chest: {
      none: ["Push-ups", "Chest Dips"],
      dumbbells: ["Dumbbell Press", "Chest Fly"],
      bands: ["Band Chest Press", "Band Fly"],
      kettlebell: ["Kettlebell Floor Press", "Kettlebell Fly"],
      barbell: ["Bench Press", "Incline Press"],
      mat: ["Push-up Holds", "Chest Squeeze"]
    },
    back: {
      none: ["Supermans", "Inverted Rows"],
      dumbbells: ["Dumbbell Rows", "Deadlifts"],
      bands: ["Band Pull-aparts", "Band Rows"],
      kettlebell: ["Kettlebell Rows", "Kettlebell Deadlifts"],
      barbell: ["Barbell Rows", "Pull-ups (barbell rack)"],
      mat: ["Cat-Cow Stretch", "Bridge Pose"]
    }
  };

  const bodyPart = document.getElementById("bodyPart");
  const equipment = document.getElementById("equipment");
  const difficulty = document.getElementById("difficulty");
  const generateBtn = document.getElementById("generateWorkout");
  const workoutCards = document.getElementById("workoutCards");

  const timerBox = document.getElementById("exerciseTimer");
  const exerciseName = document.getElementById("exerciseName");
  const exerciseCountdown = document.getElementById("exerciseCountdown");
  const startExerciseBtn = document.getElementById("startExercise");
  const progressBar = document.querySelector("#progressBar div");

  let timerInterval = null;

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  }

  generateBtn.addEventListener("click", () => {
    workoutCards.innerHTML = "";
    const bp = bodyPart.value;
    const eq = equipment.value;
    const exercises = workoutData[bp][eq] || [];

    exercises.forEach(ex => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${ex}</h3><p>${capitalize(difficulty.value)} level: 3 sets × 10 reps</p>`;
      workoutCards.appendChild(card);
    });

    if (exercises.length > 0) {
      timerBox.style.display = "block";
      exerciseName.textContent = exercises[0];
      exerciseCountdown.textContent = "00:30";
      progressBar.style.width = "0%";
    }
  });

  startExerciseBtn.addEventListener("click", () => {
    let remaining = 30;
    let total = 30;
    exerciseCountdown.textContent = formatTime(remaining);
    progressBar.style.width = "0%";
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      remaining--;
      exerciseCountdown.textContent = formatTime(remaining);
      progressBar.style.width = `${((total - remaining) / total) * 100}%`;
      if (remaining <= 0) {
        clearInterval(timerInterval);
        alert("Exercise complete!");
      }
    }, 1000);
  });

 
  const tips = [
    "Stay hydrated during workouts.",
    "Always warm up before exercise.",
    "Maintain proper form to avoid injury.",
    "Rest is as important as training.",
    "Progress comes with consistency!"
  ];
  const tipBox = document.getElementById("dailyTip");
  tipBox.textContent = tips[Math.floor(Math.random() * tips.length)];

 
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("newsletter-email").value.trim();
      if (!email.includes("@")) { alert("Invalid email"); return; }
      localStorage.setItem("greenbyte_newsletter", email);
      alert("Subscribed!");
    });
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
});
