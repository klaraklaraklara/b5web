
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


//Slider
const sliderStates = {
  instalaterskeSluzby: { index: 0 },
  topenarskeSluzby: { index: 0 },
  stehovani: { index: 0 },
  odtahy: { index: 0 },
  tepovani: { index: 0 },
  dezinfekce: { index: 0 }
};

const sliderIds = ['instalaterskeSluzby', 'topenarskeSluzby', 'stehovani', 'odtahy', 'tepovani', 'dezinfekce'];

function slide(sliderId, direction) {
  const container = document.getElementById(`slider-${sliderId}`);
  const track = container.querySelector(".slider-track");
  const images = track.querySelectorAll("img");
  const prevBtn = container.querySelector(".slider-button.prev");
  const nextBtn = container.querySelector(".slider-button.next");

  if (images.length === 0) return; 

  const visibleCount = Math.floor(container.clientWidth / images[0].clientWidth);
  const maxIndex = images.length - visibleCount;

  const totalImagesWidth = images.length * (images[0].clientWidth + 12);

  if (totalImagesWidth <= container.clientWidth) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }

  sliderStates[sliderId].index += direction;

  if (sliderStates[sliderId].index < 0) {
    sliderStates[sliderId].index = 0;
  } else if (sliderStates[sliderId].index > maxIndex) {
    sliderStates[sliderId].index = maxIndex;
  }

  const shift = -(images[0].clientWidth + 12) * sliderStates[sliderId].index;
  track.style.transform = `translateX(${shift}px)`;
}

sliderIds.forEach(id => slide(id, 0));

window.addEventListener('resize', () => {
  sliderIds.forEach(id => slide(id, 0));
});


