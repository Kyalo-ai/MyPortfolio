const typingEl = document.getElementById("typingText");
const words = ["Developer", "Creator", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = words[wordIndex];
  typingEl.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(typeLoop, 110);
  } else if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 70);
  } else {
    deleting = !deleting;
    if (!deleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeLoop, deleting ? 1100 : 280);
  }
}

typeLoop();

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.querySelector(".bar i")) {
          entry.target.querySelectorAll(".bar i").forEach((bar) => {
            bar.style.width = bar.style.getPropertyValue("--w");
          });
        }
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => revealObserver.observe(el));

const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

function handleScroll() {
  const top = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (top / height) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (top > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = "0 24px 40px rgba(0,0,0,0.45), 0 0 28px rgba(74,214,255,0.28)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: Math.min(140, Math.floor(window.innerWidth / 8)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.7,
    speed: 0.2 + Math.random() * 0.35,
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s) => {
    s.y += s.speed;
    if (s.y > canvas.height) {
      s.y = -2;
      s.x = Math.random() * canvas.width;
    }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(173, 220, 255, 0.75)";
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();

document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name || "Website Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoUrl = `mailto:kivaikyalo383@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
  });
}
