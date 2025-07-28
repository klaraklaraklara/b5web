
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


// Skratene: Cookie lišta + Analytics + podmienené načítanie Google Máp

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.innerHTML = `
    <div class="cookie-banner-inner">
      <span>Tato stránka používá soubory cookies pro analýzu návštěvnosti a zobrazení map.</span>
      <div class="cookie-buttons">
        <button id="cookie-accept">Přijmout</button>
        <button id="cookie-decline">Odmítnout</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    banner.style.display = "flex";
  } else {
    if (consent === "accepted") enableAnalyticsAndMap();
  }

  document.getElementById("cookie-accept").onclick = () => {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
    enableAnalyticsAndMap();
  };

  document.getElementById("cookie-decline").onclick = () => {
    localStorage.setItem("cookieConsent", "declined");
    banner.style.display = "none";
  };

  function enableAnalyticsAndMap() {
    const gaScript = document.createElement("script");
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-9M5TE8G686";
    gaScript.async = true;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-9M5TE8G686');

    // mapa v sekcii kontakty
    const iframe = document.querySelector("#kontakty iframe[data-src]");
    if (iframe) iframe.src = iframe.dataset.src;
  }
});