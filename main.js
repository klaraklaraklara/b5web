
let currentSection = "default";
let currentImageIndex = 0;

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function prevLightbox() {
  const images = document.querySelectorAll("#galerie .photo-gallery img");
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  openLightbox(currentImageIndex);
}

function nextLightbox() {
  const images = document.querySelectorAll("#galerie .photo-gallery img");
  currentImageIndex = (currentImageIndex + 1) % images.length;
  openLightbox(currentImageIndex);
}

function openLightbox(index) {
  const images = document.querySelectorAll("#galerie .photo-gallery img");
  if (images[index]) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = images[index].src;
    lightbox.style.display = "flex";
    currentImageIndex = index;
  }
}

document.addEventListener("keydown", function(event) {
  const lightbox = document.getElementById("lightbox");
  if (lightbox.style.display === "flex") {
    if (event.key === "ArrowLeft") {
      prevLightbox();
    } else if (event.key === "ArrowRight") {
      nextLightbox();
    } else if (event.key === "Escape") {
      closeLightbox();
    }
  }
});

function moveSlide(button, direction) {
  const container = button.closest('.slider-container');
  const track = container.querySelector('.slider-track');
  const images = track.querySelectorAll('img');
  const imageWidth = images[0].clientWidth;

  let index = Number(container.dataset.index) || 0;
  index += direction;

  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  track.style.transform = `translateX(-${index * imageWidth}px)`;
  container.dataset.index = index;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slider-container').forEach(container => {
    const images = container.querySelectorAll('.slider-track img');

    if (images.length <= 1) {
      container.classList.add('single-slide');
    }

    images.forEach(img => {
      img.addEventListener('click', (e) => {
        if (!e.target.closest('.overlay')) {
          const src = e.target.src;
          const galleryImages = document.querySelectorAll("#galerie .photo-gallery img");
          let index = Array.from(galleryImages).findIndex(i => i.src === src);
          if (index === -1) index = 0;
          openLightbox(index);
        }
      });
    });
  });
});

/*Statistiky - automaticky rok*/
(function(){
  const START_YEAR = 1992;
  const years = new Date().getFullYear() - START_YEAR;
  document.getElementById('years').textContent = years;
})();

function showSection(sectionId) {
  currentSection = sectionId;
  document.getElementById("default-sections").style.display = "none";
  document.querySelectorAll("#page-sections .hidden-section").forEach((sec) => {
    sec.classList.add("hidden");
    sec.style.display = "none";
  });
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove("hidden");
    section.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.display = "none";
  }
  const header = document.querySelector("header");
  header.style.top = "0";
}

function showDefault() {
  // 1) Skry všetky hidden sekcie
  document.querySelectorAll("#page-sections .hidden-section").forEach(sec => {
    sec.classList.add("hidden");
    sec.style.display = "none";
  });

  // 2) Zobraz hero + default-sections
  const hero = document.getElementById("hero");
  if (hero) hero.style.display = "block";

  const def = document.getElementById("default-sections");
  if (def) def.style.display = "block";

  // 3) Nechaj prebehnúť repaint a potom skrolni na vrch hero-wrapper
  setTimeout(() => {
    const topEl = document.getElementById("hero-wrapper");
    if (topEl && topEl.scrollIntoView) {
      topEl.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      // fallback
      window.scrollTo(0, 0);
    }
  }, 20);

  // 4) Skry hlavičku
  const header = document.querySelector("header");
  if (header) header.style.top = "-100px";

  currentSection = "default";
}
