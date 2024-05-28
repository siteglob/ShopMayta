// Obtener los elementos de la página
const hero = document.getElementById('hero');
const electronics = document.getElementById('electronics');
const gamming = document.getElementById('gamming');
const anime = document.getElementById('anime');
const domotica = document.getElementById('domotica');

// Agregar animaciones a los elementos
hero.addEventListener('mouseover', () => {
    hero.style.transform = 'scale(1.1)';
});

hero.addEventListener('mouseout', () => {
    hero.style.transform = 'scale(1)';
});

electronics.addEventListener('mouseover', () => {
    electronics.style.backgroundColor = '#333';
    electronics.style.color = '#fff';
});

electronics.addEventListener('mouseout', () => {
    electronics.style.backgroundColor = '#fff';
    electronics.style.color = '#333';
});

gamming.addEventListener('mouseover', () => {
    gamming.style.backgroundColor = '#333';
    gamming.style.color = '#fff';
});

gamming.addEventListener('mouseout', () => {
    gamming.style.backgroundColor = '#fff';
    gamming.style.color = '#333';
});

anime.addEventListener('mouseover', () => {
    anime.style.backgroundColor = '#333';
    anime.style.color = '#fff';
});

anime.addEventListener('mouseout', () => {
    anime.style.backgroundColor = '#fff';
    anime.style.color = '#333';
});

domotica.addEventListener('mouseover', () => {
    domotica.style.backgroundColor = '#333';
    domotica.style.color = '#fff';
});

domotica.addEventListener('mouseout', () => {
    domotica.style.backgroundColor = '#fff';
    domotica.style.color = '#333';
});

document.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
  