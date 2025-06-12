
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
  currentSection = "default";
  document.getElementById("default-sections").style.display = "block";
  document.querySelectorAll("#page-sections .section").forEach((sec) => {
    sec.classList.add("hidden");
  });

  // Show hero section again
  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.display = "flex";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  const header = document.querySelector("header");
  header.style.top = "0";
}
