# Registro de cambios — Tablero de Ajedrez

Aplicación de ajedrez para navegador escrita en JavaScript sin dependencias externas. Incluye motor de reglas propio, IA con negamax y alfa-beta, reloj, historial en notación algebraica (SAN) y persistencia de partida.

## Estado actual

- Proyecto 100% estático: no requiere servidor, build ni conexión de red.
- Funciona servido desde cualquier hosting estático o abierto como fichero local.
- Suite de pruebas headless del motor: **39/39 correctas**.

## Estructura

```
index.html          Estructura de la interfaz
style.css           Estilos del tablero, paneles y modales
chess.js            Motor de reglas, IA y controlador de interfaz
tokenharbor.json    Manifiesto de la plataforma TokenHarbor (opcional)
assets/logo.png     Logotipo e icono de la aplicación
th-kit/ui.css       Tokens de diseño y componentes base (botones, tarjetas, badges)
th-kit/fx.js        Efectos de sonido con WebAudio
th-kit/motion.js    Animaciones de entrada
th-kit/fonts/       Pilas tipográficas del sistema (sin descargas de red)
```

## Corrección de errores

### Motor de juego

- **Evaluación de la IA desde la perspectiva correcta.** `evaluateBoard(b, perspective)` devuelve ahora el punto de vista del bando indicado, y el signo se invierte en cada nivel. Antes la IA podía favorecer al rival.
- **Búsqueda sustituida por negamax con poda alfa-beta.** La implementación anterior combinaba mal maximización y minimización según el color.
- **Simulación completa de jugadas especiales.** La búsqueda ahora contempla enroque (moviendo también la torre), captura al paso y promoción con la pieza elegida, y propaga la casilla al paso entre niveles.
- **Tablas de valor posicional (PST) orientadas correctamente.** La fila 0 corresponde a la fila 8, así que se leen con `7 - r` para blancas y `r` para negras.
- **Notación SAN completa.** Incluye desambiguación por columna, fila o ambas cuando dos piezas del mismo tipo alcanzan la misma casilla, además de capturas al paso, coronación y sufijos `+` y `#`.
- **Detección de mate y ahogado reflejada en la interfaz.** El estado se actualizaba antes de comprobar el fin de partida, por lo que un mate se mostraba como simple jaque.

### Interfaz y estado

- **Deshacer bloqueado mientras la IA pensaba.** Se introdujo un contador de generación (`aiGeneration`) que invalida las respuestas tardías cuando el usuario deshace o reinicia.
- **Deshacer fiable.** Cada jugada guarda una instantánea completa del tablero previo (`boardBefore`), y las piezas capturadas se reconstruyen desde el historial.
- **Reloj.** No descuenta tiempo durante una promoción pendiente, con la partida terminada ni en el turno de la IA.
- **Doble clic sobre una pieza seleccionada la deselecciona.**
- **Piezas sin movimientos legales.** Antes se marcaban como seleccionadas sin ninguna señal y parecía que el clic no funcionaba. Ahora la casilla muestra un borde rojo (`.no-moves`) y la barra de estado indica «Esa pieza no tiene movimientos legales». Nota: en la posición inicial, el alfil de f1, la reina de d1 y las torres no tienen jugadas legales; es el comportamiento correcto, no un fallo.
- **Botón rápido de modo conectado.** El botón «Contra IA / 2 Jugadores» de la barra de acciones no tenía ningún manejador. Ahora alterna el modo, reinicia la partida y traslada el foco al selector del panel lateral.
- **Icono del modal de fin de partida.** Muestra un trofeo cuando hay ganador y un apretón de manos en caso de tablas.

## Adaptación para publicación

- **Capa de almacenamiento con degradación progresiva.** La nueva capa prueba en este orden:
  1. `window.th.session` (plataforma TokenHarbor, si está presente).
  2. `localStorage` del navegador, bajo el prefijo `ajedrez.`.
  3. Memoria, si `localStorage` no está disponible (modo privado, bloqueos).
  Antes, fuera de TokenHarbor la partida no se guardaba y se perdía al recargar.
- **Botón Compartir funcional fuera de la plataforma.** Usa `navigator.share` si existe y, si no, copia el enlace al portapapeles. Si ambas opciones fallan, indica al usuario que copie la dirección de la barra.
- **Preferencia de sonido persistente** también con `localStorage`.
- **Arranque tolerante a fallos.** `window.th.ready()` se invoca solo si existe y dentro de `try/catch`.
- **Favicon y metadatos.** Se declaran `icon`, `apple-touch-icon`, `description` y `theme-color`. Se eliminó `logo.png` de la raíz, duplicado byte a byte de `assets/logo.png` y sin referencias.

## Limpieza

- Eliminada la tabla `PST_PAWN_ENDGAME`, declarada pero nunca utilizada.
- Eliminados los ficheros temporales de instrumentación usados durante la depuración.

## Verificación realizada

| Comprobación | Resultado |
|---|---|
| Sintaxis `node --check chess.js` | Correcta |
| Suite headless del motor | 39/39 |
| Enroque corto (blancas y negras) | Correcto, SAN `O-O` |
| Enroque largo (blancas y negras) | Correcto, SAN `O-O-O` |
| Captura al paso | Correcta: peón capturado eliminado, SAN `exd6` |
| Deshacer tras enroque | Restaura rey, torre y elimina `O-O` del registro |
| Coherencia tablero lógico / DOM tras deshacer | Sin diferencias |
| Persistencia al recargar | La partida se restaura |
| Favicon | Se sirve con HTTP 200 |
| Botón Compartir | Copia el enlace al portapapeles |
| Botón rápido de modo | Alterna «Contra IA» y «2 Jugadores» |
| Respuesta de la IA | Correcta |
| Errores JavaScript en consola | Ninguno |

## Notas de mantenimiento

- El proyecto no es aún un repositorio Git. Se recomienda inicializarlo antes de publicar para poder versionar y revertir cambios.
- Si se vuelve a desplegar en TokenHarbor, la capa de almacenamiento seguirá dando prioridad a su API y `localStorage` quedará solo como respaldo.
