
const titulo = document.getElementById('titulo');
const descripcion = document.getElementById('descripcion');
const botonJugar = document.querySelector('.left-content a.btn-custom');
let currentIndex = 0;
const cards = document.querySelectorAll('.card-carousel');


const datos = [
    {
        titulo: 'Memorama de Barcos',
        descripcion: '¡Vamos a jugar al memorama! Encuentra las parejas de barquitos que navegan en el Golfo de Nicoya. Aprende cómo son las embarcaciones de nuestra costa mientras te diviertes.',
        link: '/Juegos_TCU/primerJuego.html'
    },
    {
        titulo: 'Memorama de Trabajos',
        descripcion: '¡Este juego es un poco más difícil! Busca las parejas que muestran trabajos de personas que viven cerca del mar. \nTienes solo 5 intentos ¿Podrás encontrarlas todas? ¡Tú puedes!',
        link: '/Juegos_TCU/segundoJuego.html'
    },
    {
        titulo: 'Adivinanza',
        descripcion: '¡A jugar con las palabras! Lee la pista y arrastra la respuesta correcta. Descubre los patrimonios de nuestro país usando tu imaginación. ¡Adivina y aprende!',
        link: '/Juegos_TCU/tercero.html'
    }
];

function moverCarrusel(direccion) {
    currentIndex += direccion;
    if (currentIndex < 0) currentIndex = datos.length - 1;
    if (currentIndex >= datos.length) currentIndex = 0;

    seleccionarCard(currentIndex);
}

window.onload = () => {
    seleccionarCard(currentIndex);
};


function seleccionarCard(index) {
    cards.forEach((card, i) => {
        card.classList.remove('card-active', 'card-left', 'card-right');
        card.style.opacity = 0.4;
        card.style.zIndex = 0;
        card.style.pointerEvents = 'auto';
        if (i === index) {
            card.classList.add('card-active');
            card.style.opacity = 1;
            card.style.zIndex = 3;
        } else if (i < index) {
            card.classList.add('card-left');
            card.style.zIndex = 2;
            card.style.opacity = 0.6;
        } else {
            card.classList.add('card-right');
            card.style.zIndex = 1;
            card.style.opacity = 0.6;
        }
    });

    titulo.textContent = datos[index].titulo;
    descripcion.textContent = datos[index].descripcion;
    botonJugar.href = datos[index].link;
}