// main.js

const defaultDiv = document.getElementById('default-sections');
const special = ['reference','kontakty','onas'];

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').substring(1);
    defaultDiv.classList.add('hidden');
    special.forEach(i => document.getElementById(i)?.classList.add('hidden'));
    document.getElementById(id)?.classList.remove('hidden');
  });
});

function showDefault() {
  special.forEach(i => document.getElementById(i)?.classList.add('hidden'));
  defaultDiv.classList.remove('hidden');
}

// slider
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

  

function hideHeroAndShow(id) {
  document.getElementById('hero').style.display = 'none';
  const sections = ['reference', 'kontakty', 'onas'];
  sections.forEach(s => {
    document.getElementById(s).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo(0, 0);
}

// Replace nav clicks (manually override if needed)
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href').replace('#','');
    hideHeroAndShow(id);
  });
});
