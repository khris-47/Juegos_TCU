# Juegos Interactivos TCU

Este proyecto es una pagina web con juegos educativos e interactivos orientados a ninos y ninas, inspirados en experiencias de giras comunitarias. La idea principal es aprender sobre elementos culturales y del entorno costero de forma divertida.

## De que trata

La aplicacion guia al usuario por varias pantallas:

1. `index.html`: portada con introduccion del proyecto.
2. `seleccion.html`: menu/carrusel para elegir el juego.
3. Juegos disponibles:
   - `primerJuego.html`: memorama de barcos (nivel facil, sin limite de intentos).
   - `segundoJuego.html`: memorama de trabajos (nivel dificil, con 5 vidas).
   - `tercero.html`: adivinanza con imagenes (arrastrar y soltar en escritorio, toque en movil).

## Caracteristicas principales

- Interfaz visual con Bootstrap 5 y estilos CSS personalizados.
- Audio de fondo y sonidos de victoria/derrota.
- Modales de bienvenida, victoria y derrota.
- Efectos visuales (incluye confeti con `canvas-confetti`).
- Compatibilidad basica con movil en el juego de adivinanza.

## Estructura del proyecto

- `functions/`: logica JavaScript de cada pantalla y juego.
- `styles/`: hojas de estilo por vista y componentes.
- `img/`: imagenes de fondos, menu y recursos de juegos.
- `audio/`: musica y efectos de sonido.

## Como ejecutarlo

No requiere compilacion ni backend.

1. Abrir `index.html` en el navegador.
2. Navegar al menu de juegos y seleccionar uno.

Recomendacion: para evitar problemas con rutas relativas, ejecutarlo desde un servidor local simple (por ejemplo, Live Server en VS Code).

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5
- canvas-confetti
