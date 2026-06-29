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



/* ==================== Latest Blog Slider Start ==================== */
const latestSlider = document.querySelector(".latest-slider");
const latestTrack = document.querySelector(".latest-track");
const latestPrev = document.querySelector(".latest-prev");
const latestNext = document.querySelector(".latest-next");

let latestCurrentIndex = 0;
let latestIsAnimating = false;

function getLatestGap() {
  if (!latestTrack) return 16;

  const trackStyle = window.getComputedStyle(latestTrack);
  return parseFloat(trackStyle.columnGap || trackStyle.gap) || 16;
}

function getLatestCardWidth() {
  const card = latestTrack?.querySelector(".latest-card");
  return card ? card.getBoundingClientRect().width : 0;
}

function getLatestVisibleCount() {
  if (!latestSlider || !latestTrack) return 1;

  const sliderWidth = latestSlider.getBoundingClientRect().width;
  const cardWidth = getLatestCardWidth();
  const gap = getLatestGap();

  if (!cardWidth) return 1;

  return Math.max(1, Math.floor((sliderWidth + gap) / (cardWidth + gap)));
}

function getLatestMaxIndex() {
  const totalCards = latestTrack ? latestTrack.children.length : 0;
  const visibleCards = getLatestVisibleCount();

  return Math.max(0, totalCards - visibleCards);
}

function updateLatestSlider(animate = true) {
  if (!latestTrack) return;

  const cardWidth = getLatestCardWidth();
  const gap = getLatestGap();
  const moveAmount = latestCurrentIndex * (cardWidth + gap);

  latestTrack.style.transition = animate
    ? "transform 0.72s cubic-bezier(0.22, 1, 0.36, 1)"
    : "none";

  latestTrack.style.transform = `translateX(-${moveAmount}px)`;
}

function goToLatestNext() {
  if (!latestTrack || latestIsAnimating) return;

  latestIsAnimating = true;

  const maxIndex = getLatestMaxIndex();

  latestCurrentIndex = latestCurrentIndex >= maxIndex ? 0 : latestCurrentIndex + 1;
  updateLatestSlider(true);

  window.setTimeout(() => {
    latestIsAnimating = false;
  }, 740);
}

function goToLatestPrev() {
  if (!latestTrack || latestIsAnimating) return;

  latestIsAnimating = true;

  const maxIndex = getLatestMaxIndex();

  latestCurrentIndex = latestCurrentIndex <= 0 ? maxIndex : latestCurrentIndex - 1;
  updateLatestSlider(true);

  window.setTimeout(() => {
    latestIsAnimating = false;
  }, 740);
}

function resetLatestOnResize() {
  if (!latestTrack) return;

  const maxIndex = getLatestMaxIndex();

  if (latestCurrentIndex > maxIndex) {
    latestCurrentIndex = maxIndex;
  }

  updateLatestSlider(false);
}

if (latestSlider && latestTrack && latestPrev && latestNext) {
  latestNext.addEventListener("click", goToLatestNext);
  latestPrev.addEventListener("click", goToLatestPrev);

  window.addEventListener("resize", resetLatestOnResize);
  window.addEventListener("load", () => updateLatestSlider(false));
}
/* ==================== Latest Blog Slider End ==================== */



/* ==================== Testimonial Infinite Marquee Start ==================== */
const testimonialTracks = document.querySelectorAll(".testimonial-track");

testimonialTracks.forEach((track) => {
  if (track.dataset.cloned === "true") return;

  const cards = Array.from(track.children);

  cards.forEach((card) => {
    const clonedCard = card.cloneNode(true);
    clonedCard.setAttribute("aria-hidden", "true");
    track.appendChild(clonedCard);
  });

  track.dataset.cloned = "true";
});
/* ==================== Testimonial Infinite Marquee End ==================== */



/* ==================== CTA Form Functionality Start ==================== */
const ctaForm = document.querySelector("#ctaForm");
const ctaEmail = document.querySelector("#ctaEmail");
const ctaMessage = document.querySelector("#ctaMessage");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (ctaForm && ctaEmail && ctaMessage) {
  ctaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailValue = ctaEmail.value.trim();

    ctaMessage.classList.remove("is-error", "is-success");

    if (!emailValue) {
      ctaMessage.textContent = "Please enter your email address.";
      ctaMessage.classList.add("is-error");
      ctaEmail.focus();
      return;
    }

    if (!isValidEmail(emailValue)) {
      ctaMessage.textContent = "Please enter a valid email address.";
      ctaMessage.classList.add("is-error");
      ctaEmail.focus();
      return;
    }

    ctaMessage.textContent = "Thank you! You have joined the agricultural revolution.";
    ctaMessage.classList.add("is-success");
    ctaForm.reset();
  });
}
/* ==================== CTA Form Functionality End ==================== */