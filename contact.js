document.addEventListener("DOMContentLoaded", () => {
 
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => mainNav.classList.toggle("active"));
  }

  
  const form = document.getElementById("feedbackForm");
  const formMessage = document.getElementById("formMessage");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      if (!name || !email.includes("@") || !message) {
        formMessage.textContent = "Please fill all fields correctly.";
        formMessage.style.color = "red";
        return;
      }
      const feedback = { name, email, message, date: new Date().toISOString() };
      const stored = JSON.parse(localStorage.getItem("feedback") || "[]");
      stored.push(feedback);
      localStorage.setItem("feedback", JSON.stringify(stored));
      formMessage.textContent = "Thank you! Your feedback has been submitted.";
      formMessage.style.color = "green";
      form.reset();
    });
  }

 
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
  });

 
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
});
