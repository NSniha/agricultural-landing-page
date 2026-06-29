/* ==================== Mobile Menu Elements Start ==================== */
const body = document.body;
const menuButton = document.querySelector(".menu-button");
const closeMenuButton = document.querySelector(".mobile-menu-close");
const menuOverlay = document.querySelector(".mobile-menu-overlay");
const mobileMenuLinks = document.querySelectorAll(".mobile-nav a");
/* ==================== Mobile Menu Elements End ==================== */


/* ==================== Mobile Menu Functions Start ==================== */
function openMobileMenu() {
  body.classList.add("menu-open");
}

function closeMobileMenu() {
  body.classList.remove("menu-open");
}
/* ==================== Mobile Menu Functions End ==================== */


/* ==================== Mobile Menu Events Start ==================== */
menuButton.addEventListener("click", openMobileMenu);
closeMenuButton.addEventListener("click", closeMobileMenu);
menuOverlay.addEventListener("click", closeMobileMenu);

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});
/* ==================== Mobile Menu Events End ==================== */


/* ==================== Scroll Reveal Animation Start ==================== */
const revealElements = document.querySelectorAll(".scroll-reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
/* ==================== Scroll Reveal Animation End ==================== */


/* ==================== Hero Background Parallax Start ==================== */
const heroSection = document.querySelector(".hero-section");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (heroSection && scrollY < window.innerHeight) {
    heroSection.style.backgroundPosition = `center calc(50% + ${scrollY * 0.15}px)`;
  }
});
/* ==================== Hero Background Parallax End ==================== */



/* ==================== Counter Animation Start ==================== */
const counterNumbers = document.querySelectorAll(".counter-number");

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const suffix = counter.dataset.suffix || "";
  const duration = 1600;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easedProgress * target);

    counter.textContent = `${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = `${target}${suffix}`;
    }
  }

  requestAnimationFrame(updateCounter);
}

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.45,
  }
);

counterNumbers.forEach((counter) => {
  counterObserver.observe(counter);
});
/* ==================== Counter Animation End ==================== */



