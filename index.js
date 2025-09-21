document.addEventListener('DOMContentLoaded', ()=> {
  const page = document.body.dataset.page || 'home';

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', ()=> mainNav.classList.toggle('active'));
  }

  if(page === 'home') initHome();
});

/* -------------------- HOME -------------------- */
function initHome(){
  // rotating slogans
  const slogans = [
    "Breathe deep, move free",
    "Strong body, clear mind",
    "Rest well, glow more",
    "Stretch daily, stress less"
  ];
  let si = 0;
  const el = document.getElementById('hero-slogan');
  if(el){
    setInterval(()=> {
      si = (si+1) % slogans.length;
      el.textContent = slogans[si];
    }, 3500);
  }

  // slideshow
  const slides = document.querySelectorAll('.slideshow .slide');
  if(slides.length){
    let sIndex = 0;
    setInterval(()=>{
      slides.forEach((img,i)=> img.classList.toggle('active', i===sIndex));
      sIndex = (sIndex+1) % slides.length;
    },4000);
  }

  // newsletter
  const form = document.getElementById('newsletter-form');
  if(form){
    const input = document.getElementById('email');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const val = input.value.trim();
      if(!val.includes('@')) { alert("Enter valid email"); return; }
      localStorage.setItem('greenbyte_newsletter', val);
      alert(`Thanks! Subscribed as ${val}`);
    });
  }
}
