
let currentSection = "default";
let currentImageIndex = 0;
let currentCategoryImages = [];

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  currentCategoryImages = [];
}

function prevLightbox() {
  if (currentCategoryImages.length > 0) {
    currentImageIndex = (currentImageIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length;
    updateLightboxImage();
  }
}

function nextLightbox() {
  if (currentCategoryImages.length > 0) {
    currentImageIndex = (currentImageIndex + 1) % currentCategoryImages.length;
    updateLightboxImage();
  }
}

function updateLightboxImage() {
  const lightboxImg = document.getElementById("lightbox-img");
  if (currentCategoryImages[currentImageIndex]) {
    lightboxImg.src = currentCategoryImages[currentImageIndex].src;
  }
}

function openLightbox(index, images = null) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (images) {
    currentCategoryImages = images;
  } else {
    currentCategoryImages = Array.from(document.querySelectorAll("#galerie .photo-gallery img"));
  }

  if (currentCategoryImages[index]) {
    lightboxImg.src = currentCategoryImages[index].src;
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
          const imageList = Array.from(images);
          let index = imageList.findIndex(i => i.src === src);
          if (index === -1) index = 0;
          openLightbox(index, imageList);
        }
      });
    });
  });

  // Aj obrázky v sekcii #galerie
  document.querySelectorAll("#galerie .photo-gallery img").forEach((img, index) => {
    img.addEventListener("click", () => {
      const allGalleryImages = Array.from(document.querySelectorAll("#galerie .photo-gallery img"));
      openLightbox(index, allGalleryImages);
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
    document.body.classList.remove("home-view");
  });

  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove("hidden");
    section.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const hero = document.getElementById("hero");
  if (hero) hero.style.display = "none";

  const header = document.querySelector("header");
  if (header) {
    header.classList.remove("hidden-header");
    header.classList.add("visible-header");
  }
}

function showDefault() {
  document.querySelectorAll("#page-sections .hidden-section").forEach(sec => {
    sec.classList.add("hidden");
    sec.style.display = "none";
  });

  const hero = document.getElementById("hero");
  if (hero) hero.style.display = "block";

  const def = document.getElementById("default-sections");
  if (def) def.style.display = "block";

  setTimeout(() => {
    const topEl = document.getElementById("hero-wrapper");
    if (topEl && topEl.scrollIntoView) {
      topEl.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, 20);

  const header = document.querySelector("header");
  if (header) {
    header.classList.remove("visible-header");
    header.classList.add("hidden-header");
  }
  currentSection = "default";
}
