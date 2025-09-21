document.addEventListener("DOMContentLoaded", () => {
  // mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }

  // newsletter form
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

  // calculator logic
  const form = document.getElementById("calc-form");
  const errorEl = document.getElementById("calc-error");
  const results = document.getElementById("calc-results");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      errorEl.textContent = "";

      const age = Number(document.getElementById("age").value);
      const gender = document.getElementById("gender").value;
      const height = Number(document.getElementById("height").value);
      const weight = Number(document.getElementById("weight").value);
      const activity = Number(document.getElementById("activity").value);

      if (!age || !gender || !height || !weight || !activity) {
        errorEl.textContent = "Fill all fields correctly.";
        return;
      }

      const bmr = (gender === "male")
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

      const tdee = Math.round(bmr * activity);
      const carbs = Math.round((tdee * 0.5) / 4);
      const protein = Math.round((tdee * 0.2) / 4);
      const fat = Math.round((tdee * 0.3) / 9);

      document.getElementById("res-bmr").textContent = Math.round(bmr);
      document.getElementById("res-tdee").textContent = tdee;
      document.getElementById("res-carbs").textContent = carbs;
      document.getElementById("res-protein").textContent = protein;
      document.getElementById("res-fat").textContent = fat;

      const total = (carbs * 4 + protein * 4 + fat * 9);
      document.getElementById("prog-carbs").value = Math.round((carbs * 4 / total) * 100);
      document.getElementById("prog-protein").value = Math.round((protein * 4 / total) * 100);
      document.getElementById("prog-fat").value = Math.round((fat * 9 / total) * 100);

      results.hidden = false;
    });
  }
});
