// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Constantes / Variables
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const totalCards = 12; //numero de cartas que tendra el juego
let cards = [];             // se usara como referencia a las cartas creadas
let valuesUsed = [];        // valor que se le asignara a las cartas [0,1]
let currentMove = 0;        // conteo de cartas seleccionadas en un turno (maximo 2)
let selectedCards = [];     // referencia a la carta seleccionada
let success = 0;            // numero de pares encnotrados
let tries = 0;              // numero total de intentos

// Audios
let musica = new Audio('audio/musica.mp3');
let victorySound = new Audio('audio/victoria.mp3');

// plantilla predeterminada para las cards
const cardTemplate = `
    <div class="card">
        <div class="back"></div>
        <div class="face"></div>
    </div>`;



// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Mensajes para los modales
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// mensaje de la victoria
function messageVictory() {
    return `
        <p>🤯 Has completado el juego en ${tries} intentos 🤯, ¡increíble!</p>
        <p> Puedes volver a intentarlo y tratar de mejorar tu récord. 😏 </p>
        <p> O puedes jugar la version dificil y demostrar de que estas hecho 💪😎</p>
        <p> <b>Muchas gracias por jugar, esperamos que te hayas divertido 🥰</b></p>`;
}

// modal para el inicio de la pantalla
const modalBienvenida = `
    <div class="modal fade" id="ModalBienvenida" tabindex="-1"  aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-center">
                <div class="modal-header" style="background-color: cadetblue;">
                    <h1 class="modal-title fs-5 w-100" > ¡Bienvenido al Juego de Memoria Version Facil! 😇</h1>
                </div>
                <div class="modal-body">
                    <p> Esto esta dedicado para que aprendas cuales tipos de embarcacion hay en el golfo de nicoya, mientras te diviertes con nosotros </p>
                    <p> En esta version, puedes fallar las veces que quieras</p>
                    <p> Haz clic en "Comenzar" para iniciar el juego y la música 🎵</p>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Comenzar</button>
                </div>
            </div>
        </div>
    </div>
    `;

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Funciones principales
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


// render de confetis para cuando gane 
function launchConfetti() {
    // libreria externa de canvas
    confetti({
        particleCount: 350, //cantidad de particulas
        spread: 70, //angulo de dispercion
        origin: { y: 0.8 } // punto de origen
    });
}


// funcion principal, manejara los eventos del juego, se ejecuta cada que el jugdor haga click en una card
function activate(evento) {

    // se verifican dos cosas, uno, que no se hayan volteado ya dos cartas, y que a lo que se le hixo el clic tnega la clase "card"
    if (currentMove < 2 && evento.currentTarget.classList.contains("card")) {
        
        evento.currentTarget.classList.add("active"); // a la carta que se le hizo clic, le damos la clase active, (desde el css hacemos que rote en 180grados)

        // revisamos si la card actual no ha sido ya seleccionada (para evitar un doble click a la misma)
        if (!selectedCards[0] || selectedCards[0] !== evento.currentTarget) {
            
            selectedCards.push(evento.currentTarget); // guardamos el card seleccionado

            // verificamos si este fue el segundo movimiento
            if (++currentMove === 2) {
                
                tries++; // aumentamos la cantidad de intentos

                // obtenemos el contenido HTML de la parte frontal de las dos cards
                const img1 = selectedCards[0].querySelector(".face").innerHTML;
                const img2 = selectedCards[1].querySelector(".face").innerHTML;

                //verificamos si la imagen es exactamente la misma
                if (img1 === img2) {

                    selectedCards = []; // reiniciamos el array de cartas para que las acertadas queden volteadas
                    currentMove = 0;    // reiniciamos los movimientos 
                    success++;          // aumentamos los aciertos

                    // verificamos si realizo todos los aciertos (si hay 12 cartas solo ocupa 6 aciertos)
                    if (success === totalCards / 2) {

                        // le mandamos al modal de victoria el mensaje correspondiente
                        document.getElementById('ModalBody').innerHTML = messageVictory();

                        // llamamos el canvas de confettis
                        launchConfetti();

                        // esperamos el tiempo suficiente, a que aparezca el modal de victoria
                        // para que el confeti aparezca junto o sobre el
                        setTimeout(() => {
                            const canvas = document.querySelector("canvas"); // buscamos el elemento canvas
                            if (canvas) {
                                canvas.classList.add("confetti-canvas"); // le agregamos la clase de css que se creo, y le dimos un z-index mayor al modal
                            }
                        }, 50);// esperamos 50 milisegundos

                        musica.pause(); // pausamos la musica de fondo
                        musica.currentTime = 0; // reiniciamos el tiempo de reproduccion

                        victorySound.play(); // mreproducimos la musica de victoria

                        // mostramos el modal de victoria
                        const modal = new bootstrap.Modal(document.getElementById('ModalFelicitaciones'));
                        modal.show();
                    }
                } else {

                    // en caso de fallo, dejar las cards volteadas por un momento, ara que el usuario vea el fallo
                    setTimeout(() => {

                        // quitamos la clase active a las card para que se vuelvan a voltear
                        selectedCards[0].classList.remove("active");
                        selectedCards[1].classList.remove("active");

                        selectedCards = []; // vaciamos el array de cards
                        currentMove = 0; // reiniciamos los movimientos
                    }, 600);
                }
            }
        }
    }
}



// asignamos un valor aleatoria (basado en el total de cards) a las cards
function randomValue() {

    // asignamos un valor aleatorio sin que se repita mas de dos veces
    let rnd = Math.floor(Math.random() * totalCards * 0.5); // el numero ira de 0 a la  mitad (totalcards /2 ) -1 del total de vidas

    //contamos cuantas veces ha salido el numero alaeatorio
    let values = valuesUsed.filter(value => value === rnd);

    // verificamos que no sea mayor a 2
    if (values.length < 2) {
        valuesUsed.push(rnd); // lo agregamos a la lista de valores usados
    } else {
        randomValue(); // en caso de que este repetida ya dos veces, volvemos a llmar el metodo
    }
}


// funcion encargda de iniciar o reiniciar el juego
function inicializarJuego() {

    // seleccionamos el contenedor donde van las cartas
    const container = document.querySelector("#cards-container");
    container.innerHTML = ""; // limpiamos el contenedor 
    
    // inicializamos todas las variables necesarias en 0
    cards = [];         
    valuesUsed = [];   
    currentMove = 0;   
    selectedCards = []; 
    success = 0;
    tries = 0;

    // este for se repetira tantas veces como cartas hayamos especificado
    for (let i = 0; i < totalCards; i++) {

        // creamos un nuevo elemento <div> vacio
        let div = document.createElement("div");

        // le asiganamos la plantilla de cards
        div.innerHTML = cardTemplate;

        // seleccionamos el primer (y deberia de ser el unico) elemento dentro del div, en este caso la card
        const card = div.firstElementChild;

        // guardamos esa card en el array de cards, para tener una referencia de todas ls cartas del juego
        cards.push(card);

        //agregamos la card al contenedor
        container.appendChild(card); // recordemos que lo tenemos como #cards-container ,  asi quenos aprovechamos de esa palabr reservada
        
        randomValue(); // generamos un valor aleatorio para esa carta

        // insertamos una imagen dentro de la cara (la parte boca abajo) de la card, esa imagen de debe de llamar img#, 
        // reemplazando, evidentemente, # por un numero, y usaremos ese numero como una referencia
        card.querySelector(".face").innerHTML = `<img src="img/primerJuego/img${valuesUsed[i] + 1}.png" alt="img${valuesUsed[i] + 1}" />`;
        
        // le agregamos un evento de click a la carta
        card.addEventListener("click", activate);

    }
}


// funcion encargada de dar la bienvenida al juego
// tambien, sera encargada de "disparar" la musica, porque en algunos navegadores no lo lee automaticamente
function mostrarModalBienvenida() {

    // insertamos el modal de bienvenida al final del body
    document.body.insertAdjacentHTML("beforeend", modalBienvenida);

    // creamos la instancia para mostrar ese modal recien insertado
    const bienvenidaModal = new bootstrap.Modal(document.getElementById('ModalBienvenida'));
    bienvenidaModal.show();

    // volvemos a obtener el elemento DOM del modal de bienvenida para...
    // escuchar los eventos al momento en el que se cierra
    const modalElement = document.getElementById('ModalBienvenida');
    modalElement.addEventListener('hidden.bs.modal', () => {
       
        // inicializamos la musica de fondo
        musica.loop = true; 
        musica.volume = 0.15;
        musica.play();
        inicializarJuego();

    });
}



// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Inicializacion 
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

window.addEventListener("DOMContentLoaded", () => {
    mostrarModalBienvenida();
});

 

