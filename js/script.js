// Obtener los elementos de la página
const hero = document.getElementById('hero');
const electronics = document.getElementById('electronics');
const gamming = document.getElementById('gamming');
const anime = document.getElementById('anime');
const domotica = document.getElementById('domotica');

// Agregar animaciones a los elementos
hero.addEventListener('mouseover', () => {
    hero.style.transform = 'scale(1.1)';
    hero.style.transition = 'transform 0.3s ease-in-out';
});

hero.addEventListener('mouseout', () => {
    hero.style.transform = 'scale(1)';
    hero.style.transition = 'transform 0.3s ease-in-out';
});

const elements = [electronics, gamming, anime, domotica];
elements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.backgroundColor = '#333';
        element.style.color = '#fff';
        element.style.transition = 'background-color 0.3s ease-in-out, color 0.3s ease-in-out';
    });

    element.addEventListener('mouseout', () => {
        element.style.backgroundColor = '#fff';
        element.style.color = '#333';
        element.style.transition = 'background-color 0.3s ease-in-out, color 0.3s ease-in-out';
    });
});

document.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

});

// Agregar animación de desplazamiento suave al hacer clic en los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

