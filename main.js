
let currentSection = "default";



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

//Slide fotiek na hlavnej stranke
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
      img.addEventListener('click', () => {
        showSection('galerie');
      });
    });
  });
});

/*Statistiky - automaticky rok*/ 
(function(){                                         
  const START_YEAR = 2011;                           /*  rok zalozenia */
  const years      = new Date().getFullYear() - START_YEAR; 
  document.getElementById('years').textContent = years;     
})();


function showSection(sectionId) {
  currentSection = sectionId;

  // Skry default sekcie
  document.getElementById("default-sections").style.display = "none";

  // Skry všetky hidden-sections
  document.querySelectorAll("#page-sections .hidden-section").forEach((sec) => {
    sec.classList.add("hidden");
    sec.style.display = "none"; // pridáme istotu
  });

  // Zobraz požadovanú sekciu
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove("hidden");
    section.style.display = "block"; // pridáme istotu
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Skry hero
  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.display = "none";
  }

  const header = document.querySelector("header");
  header.style.top = "0";
}
function showDefault() {
  // Skry všetky skryté sekcie
  document.querySelectorAll("#page-sections .hidden-section").forEach(section => {
    section.classList.add("hidden");
    section.style.display = "none"; // 👈 toto je dôležité!
  });

  // Zobraz hero sekciu
  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.display = "block";
  }

  // Zobraz default sekcie
  const defaultSections = document.getElementById("default-sections");
  if (defaultSections) {
    defaultSections.style.display = "block";
  }

  // Posuň sa na vrch
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, 10);

  // Skry hlavičku (header)
  const header = document.querySelector("header");
  if (header) {
    header.style.top = "-100px";
  }

  currentSection = "default";
}