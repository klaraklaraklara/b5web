
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
