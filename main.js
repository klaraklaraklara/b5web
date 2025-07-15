
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

function showSection(id) {
  // Hide default section
  const defaultSection = document.getElementById("default-sections");
  if (defaultSection) defaultSection.style.display = "none";

  // Hide all other sections
  document.querySelectorAll("#page-sections section").forEach(sec => {
    sec.classList.add("hidden");
  });

  // Show selected section
  const sectionToShow = document.getElementById(id);
  if (sectionToShow) {
    sectionToShow.classList.remove("hidden");
    window.scrollTo({
      top: sectionToShow.offsetTop - 80,
      behavior: 'smooth'
    });
  }

  // Update tracking variable
  currentSection = id;
}


function showSection(id) {
  // Hide default content
  const defaultSection = document.getElementById("default-sections");
  if (defaultSection) defaultSection.style.display = "none";

  // Hide hero + stats
  const heroWrapper = document.getElementById("hero-wrapper");
  const statsWrapper = document.getElementById("stats-wrapper");
  if (heroWrapper) heroWrapper.style.display = "none";
  if (statsWrapper) statsWrapper.style.display = "none";

  // Hide all hidden sections
  document.querySelectorAll("#page-sections section").forEach(sec => {
    sec.classList.add("hidden");
  });

  // Show selected section
  const sectionToShow = document.getElementById(id);
  if (sectionToShow) {
    sectionToShow.classList.remove("hidden");
    window.scrollTo({
      top: sectionToShow.offsetTop - 60,
      behavior: 'smooth'
    });
  }

  currentSection = id;
}


function showSection(id) {
  // Hide default content
  const defaultSection = document.getElementById("default-sections");
  if (defaultSection) defaultSection.style.display = "none";

  // Show hidden section container
  const pageSections = document.getElementById("page-sections");
  if (pageSections) pageSections.style.display = "block";

  // Hide hero + stats
  const heroWrapper = document.getElementById("hero-wrapper");
  const statsWrapper = document.getElementById("stats-wrapper");
  if (heroWrapper) heroWrapper.style.display = "none";
  if (statsWrapper) statsWrapper.style.display = "none";

  // Hide all hidden sections
  document.querySelectorAll("#page-sections section").forEach(sec => {
    sec.classList.add("hidden");
  });

  // Show selected section
  const sectionToShow = document.getElementById(id);
  if (sectionToShow) {
    sectionToShow.classList.remove("hidden");
    window.scrollTo({
      top: sectionToShow.offsetTop - 60,
      behavior: 'smooth'
    });
  }

  currentSection = id;
}


function showSection(id) {
  console.log("Showing section:", id);

  // Hide default section
  const defaultSection = document.getElementById("default-sections");
  if (defaultSection) {
    defaultSection.style.display = "none";
    console.log("Hid default section");
  }

  // Show container for hidden sections
  const pageSections = document.getElementById("page-sections");
  if (pageSections) {
    pageSections.style.display = "block";
    console.log("Displayed #page-sections");
  }

  // Hide hero and stats
  const hero = document.getElementById("hero-wrapper");
  const stats = document.getElementById("stats-wrapper");
  if (hero) {
    hero.style.display = "none";
    console.log("Hid hero");
  }
  if (stats) {
    stats.style.display = "none";
    console.log("Hid stats");
  }

  // Hide all sections inside #page-sections
  document.querySelectorAll("#page-sections section").forEach(sec => {
    sec.classList.add("hidden");
  });
  console.log("Hid all #page-sections children");

  // Show the selected one
  const toShow = document.getElementById(id);
  if (toShow) {
    toShow.classList.remove("hidden");
    console.log("Revealed section:", id);
    window.scrollTo({
      top: toShow.offsetTop - 60,
      behavior: "smooth"
    });
  }

  currentSection = id;
}
