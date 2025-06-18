
let currentSection = "default";

function showSection(sectionId) {
  currentSection = sectionId;
  document.getElementById("default-sections").style.display = "none";
  document.querySelectorAll("#page-sections .section").forEach((sec) => {
    sec.classList.add("hidden");
  });
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Hide hero section
  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.display = "none";
  }

  const header = document.querySelector("header");
  header.style.top = "0";
}

function showDefault() {
  // Hide other sections
  document.querySelectorAll("#page-sections .section").forEach(section => {
    section.classList.add("hidden");
  });

  // Show hero again
  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.display = "block";
  }

  // Show default sections
  const defaultSections = document.getElementById("default-sections");
  if (defaultSections) {
    defaultSections.style.display = "block";
  }

  // Reset scroll position
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, 10);

  // Hide the header
  const header = document.querySelector("header");
  if (header) {
    header.style.top = "-100px";
  }

  currentSection = "default";
}


// slider handling
function slide(sectionId, direction) {
  const container = document.querySelector(`#slider-${sectionId} .slider-track`);
  if (!container) return;

  const slideWidth = container.querySelector("img")?.offsetWidth + 12 || 300;
  const currentTransform = container.style.transform || "translateX(0px)";
  const currentX = parseFloat(currentTransform.match(/-?\d+/)) || 0;
  const newX = currentX - direction * slideWidth;

  container.style.transform = `translateX(${newX}px)`;
}

// lightbox gallery
let currentImageIndex = 0;
function openLightbox(index) {
  currentImageIndex = index;
  const images = document.querySelectorAll("#galerie .photo-gallery img");
  const lightbox = document.getElementById("lightbox");
  const imgElement = document.getElementById("lightbox-img");

  if (images[index]) {
    imgElement.src = images[index].src;
    lightbox.style.display = "flex";
  }
}

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
