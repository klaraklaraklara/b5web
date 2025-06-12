
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
  // skryť všetky sekcie
  document.querySelectorAll("#page-sections section").forEach(section => {
    section.classList.add("hidden");
  });

  // zobraziť hlavný obsah
  document.getElementById("default-sections").style.display = "block";

  // označiť ako "default", aby fungoval pôvodný scroll listener
  currentSection = "default";

  // skryť hlavičku ručne (rovnako ako po načítaní)
  document.querySelector("header").style.top = "-100px";

  // VYMAZAŤ SMOOTH SCROLL a nahradiť:
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);  // Počkame kúsok aby DOM mohol prepnúť sekcie
}
