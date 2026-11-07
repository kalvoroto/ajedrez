// ==========================================
// TABLERO DE AJEDREZ - MOTOR Y CONTROLADOR
// ==========================================

(function () {
  'use strict';

  // SVGs de las piezas vectoriales
  const PIECE_SVGS = {
    // Blancas
    wP: `<svg viewBox="0 0 45 45"><path d="m22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#ffffff" stroke="#1c2024" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    wN: `<svg viewBox="0 0 45 45"><path d="m22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#ffffff" stroke="#1c2024" stroke-width="1.5"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" fill="#ffffff" stroke="#1c2024" stroke-width="1.5" stroke-linejoin="round"/><circle cx="9.5" cy="25.5" r="1" fill="#1c2024"/></svg>`,
    wB: `<svg viewBox="0 0 45 45"><g fill="#ffffff" stroke="#1c2024" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="m25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="m17.5 26h10M22.5 21v10" stroke="#1c2024" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    wR: `<svg viewBox="0 0 45 45"><g fill="#ffffff" stroke="#1c2024" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zm3-3v-4h21v4H12zm2-4V14h17v18H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z"/><path d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23"/></g></svg>`,
    wQ: `<svg viewBox="0 0 45 45"><g fill="#ffffff" stroke="#1c2024" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-6-15-2 15-6-15-7 11 2 12zm0 5c0 1.5 2 2.5 4 3 8 2 16 2 24 0 2-.5 4-1.5 4-3l-2.5-5h-27l-2.5 5zm0 8h27v-3H9v3z"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/></g></svg>`,
    wK: `<svg viewBox="0 0 45 45"><g fill="#ffffff" stroke="#1c2024" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22.5 11.63v4.37M20.31 13.81h4.38"/><path d="m22.5 16.5c-4.5 0-8 3.5-8 8 0 3.5 2.5 6.5 6.5 8h3c4-1.5 6.5-4.5 6.5-8 0-4.5-3.5-8-8-8z"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-2c-5.5 3.5-15.5 3.5-21 0v2z"/><path d="M11.5 32c5.5 3 15.5 3 21 0v-2c-5.5 3-15.5 3-21 0v2z"/><path d="M11.5 39h22v-2h-22v2z"/></g></svg>`,

    // Negras
    bP: `<svg viewBox="0 0 45 45"><path d="m22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#1c2024" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    bN: `<svg viewBox="0 0 45 45"><path d="m22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#1c2024" stroke="#ffffff" stroke-width="1.2"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" fill="#1c2024" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/><circle cx="9.5" cy="25.5" r="1" fill="#ffffff"/></svg>`,
    bB: `<svg viewBox="0 0 45 45"><g fill="#1c2024" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="m25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="m17.5 26h10M22.5 21v10" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    bR: `<svg viewBox="0 0 45 45"><g fill="#1c2024" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zm3-3v-4h21v4H12zm2-4V14h17v18H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z"/><path d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23" stroke="#ffffff"/></g></svg>`,
    bQ: `<svg viewBox="0 0 45 45"><g fill="#1c2024" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-6-15-2 15-6-15-7 11 2 12zm0 5c0 1.5 2 2.5 4 3 8 2 16 2 24 0 2-.5 4-1.5 4-3l-2.5-5h-27l-2.5 5zm0 8h27v-3H9v3z"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/></g></svg>`,
    bK: `<svg viewBox="0 0 45 45"><g fill="#1c2024" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="m22.5 11.63v4.37M20.31 13.81h4.38"/><path d="m22.5 16.5c-4.5 0-8 3.5-8 8 0 3.5 2.5 6.5 6.5 8h3c4-1.5 6.5-4.5 6.5-8 0-4.5-3.5-8-8-8z"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-2c-5.5 3.5-15.5 3.5-21 0v2z"/><path d="M11.5 32c5.5 3 15.5 3 21 0v-2c-5.5 3-15.5 3-21 0v2z"/><path d="M11.5 39h22v-2h-22v2z"/></g></svg>`
  };

  const PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };

  // Tablas de valores posicionales simples para IA.
  // IMPORTANTE: r = 0 es la fila 8 (lado de las negras), por lo que estas
  // tablas están escritas desde la perspectiva de las BLANCAS y se leen con
  // PST[7 - r][c] para blancas y PST[r][c] para negras (ver evaluateBoard).
  const PST_PAWN = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
  ];

  const PST_KNIGHT = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
  ];

  // Estado del juego
  let board = []; // 8x8: null o { color: 'w'|'b', type: 'p'|'n'|'b'|'r'|'q'|'k' }
  let turn = 'w';
  let castling = { wK: true, wQ: true, bK: true, bQ: true };
  let enPassant = null; // { r, c }
  let halfMoveClock = 0;
  let fullMoveNumber = 1;
  let history = []; // movimientos realizados
  let capturedPieces = { w: [], b: [] };

  // Ajustes de usuario
  let settings = {
    mode: 'ai', // 'ai' | 'pvp'
    aiDifficulty: 'medium', // 'easy' | 'medium' | 'hard'
    playerColor: 'w', // si juega contra IA: w o b
    flipped: false, // vista del tablero
    boardTheme: 'classic',
    clockMinutes: 0,
    sound: true
  };

  let selectedSquare = null; // { r, c }
  let validMovesForSelected = [];
  let lastMove = null; // { from: {r,c}, to: {r,c} }
  let pendingPromotion = null;
  let isAiThinking = false;
  let aiGeneration = 0; // invalida respuestas tardías de la IA tras deshacer/reiniciar
  let clocks = { w: 0, b: 0 };
  let gameOver = false;
  let lastTick = Date.now();

  // Elementos DOM
  const elBoard = document.getElementById('chessboard');
  const elStatus = document.getElementById('status-text');
  const elMovesLog = document.getElementById('moves-log');
  const elMoveCount = document.getElementById('move-count-text');
  const elTurnBadge = document.getElementById('turn-indicator-badge');
  const elSoundBtn = document.getElementById('btn-sound');
  const elSoundIcon = document.getElementById('sound-icon');
  const elShareBtn = document.getElementById('btn-share');
  const elNewBtn = document.getElementById('btn-new');
  const elUndoBtn = document.getElementById('btn-undo');
  const elFlipBtn = document.getElementById('btn-flip');
  const elModeQuick = document.getElementById('btn-mode-quick');
  const elModeBadge = document.getElementById('mode-badge-label');
  const elPromoModal = document.getElementById('promotion-modal');
  const elPromoChoices = document.getElementById('promo-choices');
  const elGameOverModal = document.getElementById('gameover-modal');
  const elGoTitle = document.getElementById('go-title');
  const elGoDesc = document.getElementById('go-description');
  const elGoIcon = document.getElementById('go-icon');
  const elRematchBtn = document.getElementById('btn-rematch');
  const elCloseModalBtn = document.getElementById('btn-close-modal');

  // Inicializar estado del tablero estandar
  function initBoard() {
    board = Array(8).fill(null).map(() => Array(8).fill(null));
    // Piezas negras
    const backRow = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    for (let c = 0; c < 8; c++) {
      board[0][c] = { color: 'b', type: backRow[c] };
      board[1][c] = { color: 'b', type: 'p' };
      board[6][c] = { color: 'w', type: 'p' };
      board[7][c] = { color: 'w', type: backRow[c] };
    }
    turn = 'w';
    castling = { wK: true, wQ: true, bK: true, bQ: true };
    enPassant = null;
    halfMoveClock = 0;
    fullMoveNumber = 1;
    history = [];
    capturedPieces = { w: [], b: [] };
    selectedSquare = null;
    validMovesForSelected = [];
    lastMove = null;
    isAiThinking = false;
    gameOver = false;
    clocks = { w: settings.clockMinutes * 60000, b: settings.clockMinutes * 60000 };
    pendingPromotion = null;
    lastTick = Date.now();
  }

  function formatClock(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  function renderClocks() {
    const top = document.getElementById('top-clock');
    const bottom = document.getElementById('bottom-clock');
    const on = settings.clockMinutes > 0;
    top.hidden = !on;
    bottom.hidden = !on;
    if (!on) return;
    const isFlipped = settings.flipped || (settings.mode === 'ai' && settings.playerColor === 'b');
    const bottomColor = isFlipped ? 'b' : 'w';
    const topColor = isFlipped ? 'w' : 'b';
    [[top, topColor], [bottom, bottomColor]].forEach(([el, col]) => {
      el.textContent = formatClock(clocks[col]);
      const running = !gameOver && history.length > 0 && turn === col;
      el.classList.toggle('is-running', running);
      el.classList.toggle('is-low', clocks[col] < 30000);
    });
  }

  function tickClock() {
    const now = Date.now();
    const dt = now - lastTick;
    lastTick = now;
    // Sin reloj, con la partida acabada, esperando promoción o antes de la primera
    // jugada no se descuenta tiempo. El turno de la IA tampoco consume su reloj.
    const aiTurn = settings.mode === 'ai' && turn !== settings.playerColor;
    if (settings.clockMinutes <= 0 || gameOver || history.length === 0 || pendingPromotion || aiTurn) return;
    clocks[turn] -= dt;
    if (clocks[turn] <= 0) {
      clocks[turn] = 0;
      const loser = turn;
      renderClocks();
      showGameOver(loser === 'w' ? '¡Ganan las Negras!' : '¡Ganan las Blancas!',
        'Se acabó el tiempo de ' + (loser === 'w' ? 'las Blancas.' : 'las Negras.'));
      saveSession();
      return;
    }
    renderClocks();
  }

  // Reproducir sonido si esta activado
  function playSound(type) {
    if (!settings.sound || !window.fx) return;
    try {
      if (type === 'move') window.fx.sound('tap');
      else if (type === 'capture') window.fx.sound('pop');
      else if (type === 'check') window.fx.sound('tick');
      else if (type === 'win') window.fx.sound('magic');
      else if (type === 'loss') window.fx.sound('fail');
    } catch (e) {}
  }

  // Comprobar si una posición está dentro de los límites
  function inBounds(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
  }

  // Clonar el tablero
  function cloneBoard(b) {
    return b.map(row => row.map(cell => cell ? { ...cell } : null));
  }

  // Obtener movimientos pseudo-legales (sin verificar si deja al rey en jaque)
  function getPseudoMoves(b, r, c, ep, castleState) {
    const piece = b[r][c];
    if (!piece) return [];
    const moves = [];
    const color = piece.color;
    const oppColor = color === 'w' ? 'b' : 'w';

    if (piece.type === 'p') {
      const dir = color === 'w' ? -1 : 1;
      const startRank = color === 'w' ? 6 : 1;

      // Avance 1 casilla
      const nextR = r + dir;
      if (inBounds(nextR, c) && !b[nextR][c]) {
        moves.push({ from: { r, c }, to: { r: nextR, c }, promo: (color === 'w' && nextR === 0) || (color === 'b' && nextR === 7) });
        // Avance doble
        const doubleR = r + dir * 2;
        if (r === startRank && !b[doubleR][c]) {
          moves.push({ from: { r, c }, to: { r: doubleR, c }, isDoublePawn: true });
        }
      }

      // Capturas normales y al paso
      [-1, 1].forEach(dc => {
        const nc = c + dc;
        if (inBounds(nextR, nc)) {
          if (b[nextR][nc] && b[nextR][nc].color === oppColor) {
            moves.push({ from: { r, c }, to: { r: nextR, c: nc }, promo: (color === 'w' && nextR === 0) || (color === 'b' && nextR === 7) });
          } else if (ep && ep.r === nextR && ep.c === nc) {
            moves.push({ from: { r, c }, to: { r: nextR, c: nc }, isEnPassant: true });
          }
        }
      });
    } else if (piece.type === 'n') {
      const knightDeltas = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      knightDeltas.forEach(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (inBounds(nr, nc)) {
          if (!b[nr][nc] || b[nr][nc].color === oppColor) {
            moves.push({ from: { r, c }, to: { r: nr, c: nc } });
          }
        }
      });
    } else if (piece.type === 'k') {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (inBounds(nr, nc)) {
            if (!b[nr][nc] || b[nr][nc].color === oppColor) {
              moves.push({ from: { r, c }, to: { r: nr, c: nc } });
            }
          }
        }
      }

      // Enroque
      if (castleState) {
        if (color === 'w' && r === 7 && c === 4) {
          // Corto
          if (castleState.wK && !b[7][5] && !b[7][6] && b[7][7]?.type === 'r' && b[7][7]?.color === 'w') {
            if (!isSquareAttacked(b, 7, 4, 'b') && !isSquareAttacked(b, 7, 5, 'b') && !isSquareAttacked(b, 7, 6, 'b')) {
              moves.push({ from: { r, c }, to: { r: 7, c: 6 }, isCastle: 'K' });
            }
          }
          // Largo
          if (castleState.wQ && !b[7][3] && !b[7][2] && !b[7][1] && b[7][0]?.type === 'r' && b[7][0]?.color === 'w') {
            if (!isSquareAttacked(b, 7, 4, 'b') && !isSquareAttacked(b, 7, 3, 'b') && !isSquareAttacked(b, 7, 2, 'b')) {
              moves.push({ from: { r, c }, to: { r: 7, c: 2 }, isCastle: 'Q' });
            }
          }
        } else if (color === 'b' && r === 0 && c === 4) {
          // Corto
          if (castleState.bK && !b[0][5] && !b[0][6] && b[0][7]?.type === 'r' && b[0][7]?.color === 'b') {
            if (!isSquareAttacked(b, 0, 4, 'w') && !isSquareAttacked(b, 0, 5, 'w') && !isSquareAttacked(b, 0, 6, 'w')) {
              moves.push({ from: { r, c }, to: { r: 0, c: 6 }, isCastle: 'K' });
            }
          }
          // Largo
          if (castleState.bQ && !b[0][3] && !b[0][2] && !b[0][1] && b[0][0]?.type === 'r' && b[0][0]?.color === 'b') {
            if (!isSquareAttacked(b, 0, 4, 'w') && !isSquareAttacked(b, 0, 3, 'w') && !isSquareAttacked(b, 0, 2, 'w')) {
              moves.push({ from: { r, c }, to: { r: 0, c: 2 }, isCastle: 'Q' });
            }
          }
        }
      }
    } else {
      // Alfil, Torre o Reina (deslizantes)
      const dirs = [];
      if (piece.type === 'b' || piece.type === 'q') {
        dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
      }
      if (piece.type === 'r' || piece.type === 'q') {
        dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);
      }

      dirs.forEach(([dr, dc]) => {
        let nr = r + dr;
        let nc = c + dc;
        while (inBounds(nr, nc)) {
          if (!b[nr][nc]) {
            moves.push({ from: { r, c }, to: { r: nr, c: nc } });
          } else {
            if (b[nr][nc].color === oppColor) {
              moves.push({ from: { r, c }, to: { r: nr, c: nc } });
            }
            break;
          }
          nr += dr;
          nc += dc;
        }
      });
    }

    return moves;
  }

  // Verifica si una casilla es atacada por un color dado
  function isSquareAttacked(b, r, c, byColor) {
    // Atacada por peones
    const pDir = byColor === 'w' ? 1 : -1; // Desde donde vendria el peon enemigo
    for (let dc of [-1, 1]) {
      const pr = r + pDir;
      const pc = c + dc;
      if (inBounds(pr, pc)) {
        const p = b[pr][pc];
        if (p && p.color === byColor && p.type === 'p') return true;
      }
    }

    // Atacada por caballo
    const knightDeltas = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    for (let [dr, dc] of knightDeltas) {
      const nr = r + dr;
      const nc = c + dc;
      if (inBounds(nr, nc)) {
        const p = b[nr][nc];
        if (p && p.color === byColor && p.type === 'n') return true;
      }
    }

    // Atacada por rey enemigo
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (inBounds(nr, nc)) {
          const p = b[nr][nc];
          if (p && p.color === byColor && p.type === 'k') return true;
        }
      }
    }

    // Líneas rectas (Torre/Reina)
    const ortho = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let [dr, dc] of ortho) {
      let nr = r + dr;
      let nc = c + dc;
      while (inBounds(nr, nc)) {
        const p = b[nr][nc];
        if (p) {
          if (p.color === byColor && (p.type === 'r' || p.type === 'q')) return true;
          break;
        }
        nr += dr;
        nc += dc;
      }
    }

    // Diagonales (Alfil/Reina)
    const diags = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (let [dr, dc] of diags) {
      let nr = r + dr;
      let nc = c + dc;
      while (inBounds(nr, nc)) {
        const p = b[nr][nc];
        if (p) {
          if (p.color === byColor && (p.type === 'b' || p.type === 'q')) return true;
          break;
        }
        nr += dr;
        nc += dc;
      }
    }

    return false;
  }

  // Encuentra la casilla del rey
  function findKing(b, color) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = b[r][c];
        if (p && p.color === color && p.type === 'k') {
          return { r, c };
        }
      }
    }
    return null;
  }

  // Verifica si el rey de un color está en jaque
  function isKingInCheck(b, color) {
    const kPos = findKing(b, color);
    if (!kPos) return false;
    const opp = color === 'w' ? 'b' : 'w';
    return isSquareAttacked(b, kPos.r, kPos.c, opp);
  }

  // Simula un movimiento sobre un tablero clonado y retorna si es legal
  function isLegalMove(b, move, color, ep, castle) {
    const tempBoard = cloneBoard(b);
    const { from, to, isEnPassant, isCastle, promo } = move;
    const piece = tempBoard[from.r][from.c];

    tempBoard[to.r][to.c] = piece;
    tempBoard[from.r][from.c] = null;

    if (isEnPassant) {
      // Quitar el peón capturado
      const capR = color === 'w' ? to.r + 1 : to.r - 1;
      tempBoard[capR][to.c] = null;
    }

    if (isCastle) {
      if (isCastle === 'K') {
        const rook = tempBoard[from.r][7];
        tempBoard[from.r][5] = rook;
        tempBoard[from.r][7] = null;
      } else if (isCastle === 'Q') {
        const rook = tempBoard[from.r][0];
        tempBoard[from.r][3] = rook;
        tempBoard[from.r][0] = null;
      }
    }

    if (promo) {
      tempBoard[to.r][to.c] = { color, type: move.promoChoice || 'q' };
    }

    return !isKingInCheck(tempBoard, color);
  }

  // Obtiene todos los movimientos estrictamente legales para una casilla
  function getLegalMovesForSquare(r, c) {
    const piece = board[r][c];
    if (!piece || piece.color !== turn) return [];
    const pseudos = getPseudoMoves(board, r, c, enPassant, castling);
    return pseudos.filter(m => isLegalMove(board, m, turn, enPassant, castling));
  }

  // Obtiene todos los movimientos legales de un bando
  function getAllLegalMoves(b, color, ep, castle) {
    const moves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = b[r][c];
        if (piece && piece.color === color) {
          const pseudos = getPseudoMoves(b, r, c, ep, castle);
          for (let m of pseudos) {
            if (isLegalMove(b, m, color, ep, castle)) {
              moves.push(m);
            }
          }
        }
      }
    }
    return moves;
  }

  const FILE_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const RANK_NAMES = ['8', '7', '6', '5', '4', '3', '2', '1'];

  // Notación algebraica estándar (SAN) con desambiguación de piezas.
  // `positionBefore` debe ser el tablero ANTES de mover.
  function moveToString(move, piece, isCapture, isCheck, isMate, positionBefore) {
    if (move.isCastle === 'K') return isMate ? 'O-O#' : (isCheck ? 'O-O+' : 'O-O');
    if (move.isCastle === 'Q') return isMate ? 'O-O-O#' : (isCheck ? 'O-O-O+' : 'O-O-O');

    const file = i => FILE_NAMES[i];
    const rank = i => RANK_NAMES[i];

    let san = '';

    if (piece.type === 'p') {
      if (isCapture || move.isEnPassant) {
        san += file(move.from.c) + 'x';
      }
      san += file(move.to.c) + rank(move.to.r);
      if (move.promoChoice) {
        san += '=' + move.promoChoice.toUpperCase();
      }
    } else {
      san += piece.type.toUpperCase();

      // Desambiguación: ¿otra pieza del mismo tipo también puede llegar ahí y es legal?
      let ambiguous = [];
      if (positionBefore) {
        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            if (r === move.from.r && c === move.from.c) continue;
            const other = positionBefore[r][c];
            if (!other || other.color !== piece.color || other.type !== piece.type) continue;

            const pseudo = getPseudoMoves(positionBefore, r, c, null, null);
            const reaches = pseudo.some(m =>
              m.to.r === move.to.r && m.to.c === move.to.c &&
              isLegalMove(positionBefore, m, piece.color, null, null)
            );
            if (reaches) ambiguous.push({ r, c });
          }
        }
      }

      if (ambiguous.length > 0) {
        const sameFile = ambiguous.some(a => a.c === move.from.c);
        const sameRank = ambiguous.some(a => a.r === move.from.r);

        if (!sameFile) {
          san += file(move.from.c);
        } else if (!sameRank) {
          san += rank(move.from.r);
        } else {
          san += file(move.from.c) + rank(move.from.r);
        }
      }

      if (isCapture) san += 'x';
      san += file(move.to.c) + rank(move.to.r);
    }

    if (isMate) san += '#';
    else if (isCheck) san += '+';

    return san;
  }

  // Ejecuta un movimiento en el estado principal
  function applyMove(move) {
    const { from, to, isEnPassant, isCastle, promoChoice } = move;
    const movingPiece = board[from.r][from.c];
    const targetPiece = board[to.r][to.c];
    const captured = isEnPassant
      ? board[turn === 'w' ? to.r + 1 : to.r - 1][to.c]
      : targetPiece;

    // Guardar para deshacer
    const moveRecord = {
      from: { ...from },
      to: { ...to },
      piece: { ...movingPiece },
      captured: captured ? { ...captured } : null,
      castling: { ...castling },
      enPassant: enPassant ? { ...enPassant } : null,
      halfMoveClock,
      fullMoveNumber,
      isEnPassant,
      isCastle,
      isDoublePawn: !!move.isDoublePawn,
      promoChoice,
      // Estado completo del tablero antes de la jugada: permite un deshacer fiable.
      boardBefore: cloneBoard(board)
    };

    // Aplicar al tablero
    board[to.r][to.c] = movingPiece;
    board[from.r][from.c] = null;

    if (isEnPassant) {
      const capR = turn === 'w' ? to.r + 1 : to.r - 1;
      board[capR][to.c] = null;
    }

    if (captured) {
      capturedPieces[captured.color].push(captured.type);
    }

    if (isCastle === 'K') {
      const rook = board[from.r][7];
      board[from.r][5] = rook;
      board[from.r][7] = null;
    } else if (isCastle === 'Q') {
      const rook = board[from.r][0];
      board[from.r][3] = rook;
      board[from.r][0] = null;
    }

    // Promocion
    if (promoChoice) {
      board[to.r][to.c] = { color: turn, type: promoChoice };
    }

    // Actualizar derechos de enroque
    if (movingPiece.type === 'k') {
      if (turn === 'w') { castling.wK = false; castling.wQ = false; }
      else { castling.bK = false; castling.bQ = false; }
    } else if (movingPiece.type === 'r') {
      if (from.r === 7 && from.c === 0) castling.wQ = false;
      if (from.r === 7 && from.c === 7) castling.wK = false;
      if (from.r === 0 && from.c === 0) castling.bQ = false;
      if (from.r === 0 && from.c === 7) castling.bK = false;
    }
    // Si una torre enemiga fue capturada en su esquina
    if (to.r === 7 && to.c === 0) castling.wQ = false;
    if (to.r === 7 && to.c === 7) castling.wK = false;
    if (to.r === 0 && to.c === 0) castling.bQ = false;
    if (to.r === 0 && to.c === 7) castling.bK = false;

    // Actualizar casilla al paso
    if (move.isDoublePawn) {
      enPassant = { r: (from.r + to.r) / 2, c: from.c };
    } else {
      enPassant = null;
    }

    // 50 movimientos
    if (movingPiece.type === 'p' || captured) {
      halfMoveClock = 0;
    } else {
      halfMoveClock++;
    }

    if (turn === 'b') {
      fullMoveNumber++;
    }

    // Cambiar turno
    const nextTurn = turn === 'w' ? 'b' : 'w';
    const isCheck = isKingInCheck(board, nextTurn);
    const nextMoves = getAllLegalMoves(board, nextTurn, enPassant, castling);
    const isMate = isCheck && nextMoves.length === 0;
    const isStalemate = !isCheck && nextMoves.length === 0;

    moveRecord.san = moveToString(move, movingPiece, !!captured, isCheck, isMate, moveRecord.boardBefore);
    moveRecord.isCheck = isCheck;
    moveRecord.isMate = isMate;
    moveRecord.isStalemate = isStalemate;

    history.push(moveRecord);
    lastMove = { from, to };
    turn = nextTurn;

    // Efectos de sonido
    if (isMate) playSound('win');
    else if (isCheck) playSound('check');
    else if (captured) playSound('capture');
    else playSound('move');

    saveSession();
    renderAll();

    // Comprobar fin de partida
    if (isMate) {
      showGameOver(movingPiece.color === 'w' ? '¡Ganan las Blancas!' : '¡Ganan las Negras!', 'Jaque mate ineludible.');
      return;
    }
    if (isStalemate) {
      showGameOver('Tablas por ahogado', 'El jugador no tiene movimientos legales posibles.');
      return;
    }
    if (halfMoveClock >= 100) {
      showGameOver('Tablas', 'Regla de los 50 movimientos sin captura ni avance de peón.');
      return;
    }

    // Si le toca a la IA
    if (settings.mode === 'ai' && turn !== settings.playerColor) {
      triggerAiMove();
    }
  }

  // Aplica un movimiento al tablero sin tocar el estado global (uso interno).
  function simulateMove(b, m) {
    const piece = b[m.from.r][m.from.c];
    if (!piece) return;

    b[m.to.r][m.to.c] = piece;
    b[m.from.r][m.from.c] = null;

    if (m.isEnPassant) {
      const capR = piece.color === 'w' ? m.to.r + 1 : m.to.r - 1;
      b[capR][m.to.c] = null;
    }

    if (m.isCastle === 'K') {
      b[m.from.r][5] = b[m.from.r][7];
      b[m.from.r][7] = null;
    } else if (m.isCastle === 'Q') {
      b[m.from.r][3] = b[m.from.r][0];
      b[m.from.r][0] = null;
    }

    if (m.promo) {
      b[m.to.r][m.to.c] = { color: piece.color, type: m.promoChoice || 'q' };
    }
  }

  // Deshacer movimiento: restaura el estado guardado antes de la jugada.
  function undoMove() {
    if (history.length === 0 || pendingPromotion) return;

    // Si la IA tenía una jugada en cola, se descarta: el usuario está deshaciendo.
    aiGeneration++;
    isAiThinking = false;
    elStatus.classList.remove('th-pulse');

    // En modo IA vuelve hasta recuperar el turno del jugador; en PvP, una sola jugada.
    const target = settings.mode === 'ai' ? settings.playerColor : turn;
    let lastPopped = null;

    do {
      const rec = history.pop();
      if (!rec) break;
      lastPopped = rec;
      board = cloneBoard(rec.boardBefore);
      castling = { ...rec.castling };
      enPassant = rec.enPassant ? { ...rec.enPassant } : null;
      halfMoveClock = rec.halfMoveClock;
      fullMoveNumber = rec.fullMoveNumber;
      turn = rec.piece.color;
    } while (history.length > 0 && lastPopped.piece.color !== target);

    // Reconstruir piezas capturadas desde cero según el historial restante.
    capturedPieces = { w: [], b: [] };
    history.forEach(rec => {
      if (rec.captured) capturedPieces[rec.captured.color].push(rec.captured.type);
    });

    gameOver = false;
    pendingPromotion = null;
    isAiThinking = false;
    elStatus.classList.remove('th-pulse');
    lastMove = history.length > 0
      ? { from: history[history.length - 1].from, to: history[history.length - 1].to }
      : null;
    selectedSquare = null;
    validMovesForSelected = [];
    lastTick = Date.now();
    saveSession();
    renderAll();
  }

  // ==========================================
  // EVALUACIÓN Y BÚSQUEDA DE LA IA
  // Convención: evaluateBoard SIEMPRE devuelve el punto de vista del color
  // que recibe el parámetro `perspective` (positivo = mejor para él).
  // ==========================================

  const MATE_SCORE = 100000;
  const INF = 1e9;

  function evaluateBoard(b, perspective) {
    let score = 0;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = b[r][c];
        if (!p) continue;

        const val = PIECE_VALUES[p.type] || 0;
        let posBonus = 0;

        // La fila propia de cada bando es la del índice 7 para blancas y la 0 para negras.
        const pstRow = p.color === 'w' ? 7 - r : r;

        if (p.type === 'p') {
          posBonus = PST_PAWN[pstRow][c];
        } else if (p.type === 'n') {
          posBonus = PST_KNIGHT[pstRow][c];
        }

        score += p.color === perspective ? (val + posBonus) : -(val + posBonus);
      }
    }

    return score;
  }

  // Negamax con poda alfa-beta. El signo de la evaluación se invierte en cada
  // nivel, de modo que siempre se maximiza desde el punto de vista del que mueve.
  function negamax(b, depth, alpha, beta, colorToMove, ep, castle) {
    const moves = getAllLegalMoves(b, colorToMove, ep, castle);

    if (moves.length === 0) {
      if (isKingInCheck(b, colorToMove)) {
        // Mate: cuanto más cerca, peor para el que lo sufre.
        return -MATE_SCORE + (1000 - depth);
      }
      return 0; // Ahogado
    }

    if (depth === 0) {
      return evaluateBoard(b, colorToMove);
    }

    let best = -INF;

    for (let m of moves) {
      const nextBoard = cloneBoard(b);
      const mv = m.promo ? { ...m, promoChoice: m.promoChoice || 'q' } : m;
      simulateMove(nextBoard, mv);

      const nextEp = m.isDoublePawn ? { r: (m.from.r + m.to.r) / 2, c: m.from.c } : null;
      const score = -negamax(nextBoard, depth - 1, -beta, -alpha, colorToMove === 'w' ? 'b' : 'w', nextEp, castle);

      if (score > best) best = score;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }

    return best;
  }

  // Reproduce cada jugada en un tablero aparte para asegurar claridad de estado.
  function searchBestMove(legalMoves, color, depth) {
    let bestScore = -INF;
    let candidates = [];

    // Barajar movimientos para que la IA no sea repetitiva entre partidas.
    const shuffled = legalMoves.slice().sort(() => Math.random() - 0.5);

    for (let m of shuffled) {
      const nextBoard = cloneBoard(board);
      const mv = m.promo ? { ...m, promoChoice: m.promoChoice || 'q' } : m;
      simulateMove(nextBoard, mv);

      const nextEp = m.isDoublePawn ? { r: (m.from.r + m.to.r) / 2, c: m.from.c } : null;
      const score = -negamax(nextBoard, depth - 1, -INF, INF, color === 'w' ? 'b' : 'w', nextEp, castling);

      if (score > bestScore) {
        bestScore = score;
        candidates = [m];
      } else if (score === bestScore) {
        candidates.push(m);
      }
    }

    return candidates.length
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : legalMoves[0];
  }

  // Turno de la IA
  function triggerAiMove() {
    if (gameOver) return;
    isAiThinking = true;
    elStatus.textContent = 'Pensando jugada...';
    elStatus.classList.add('th-pulse');

    // Cada llamada recibe un token: si el usuario deshace o reinicia mientras
    // tanto, la respuesta obsoleta se descarta en lugar de aplicarse.
    const token = ++aiGeneration;

    setTimeout(() => {
      if (token !== aiGeneration || gameOver) {
        isAiThinking = false;
        elStatus.classList.remove('th-pulse');
        return;
      }

      const aiColor = turn;
      const legalMoves = getAllLegalMoves(board, aiColor, enPassant, castling);

      if (legalMoves.length === 0) {
        isAiThinking = false;
        elStatus.classList.remove('th-pulse');
        renderAll();
        return;
      }

      let chosenMove = null;

      if (settings.aiDifficulty === 'easy') {
        // Fácil: capturas preferentes, pero sin búsqueda profunda.
        const captures = legalMoves.filter(m => board[m.to.r][m.to.c] !== null);
        if (captures.length > 0 && Math.random() < 0.6) {
          chosenMove = captures[Math.floor(Math.random() * captures.length)];
        } else {
          chosenMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
        }
      } else {
        const depth = settings.aiDifficulty === 'hard' ? 3 : 2;
        chosenMove = searchBestMove(legalMoves, aiColor, depth);
      }

      if (chosenMove.promo) {
        chosenMove.promoChoice = 'q';
      }

      isAiThinking = false;
      elStatus.classList.remove('th-pulse');
      applyMove(chosenMove);
    }, 380);
  }

  // Manejador de clic en casillas
  function handleSquareClick(r, c) {
    if (isAiThinking || gameOver) return;
    if (settings.mode === 'ai' && turn !== settings.playerColor) return;

    const piece = board[r][c];

    // Si ya habia una seleccion
    if (selectedSquare) {
      const isDestination = validMovesForSelected.find(m => m.to.r === r && m.to.c === c);

      if (isDestination) {
        // Es un movimiento valido
        if (isDestination.promo) {
          // Preguntar pieza de promocion
          pendingPromotion = isDestination;
          openPromotionModal(turn);
          return;
        } else {
          applyMove(isDestination);
          selectedSquare = null;
          validMovesForSelected = [];
          return;
        }
      } else if (piece && piece.color === turn && !(selectedSquare.r === r && selectedSquare.c === c)) {
        // Cambiar seleccion a otra pieza propia
        selectedSquare = { r, c };
        validMovesForSelected = getLegalMovesForSquare(r, c);
        renderBoard();
        return;
      } else {
        // Deseleccionar
        selectedSquare = null;
        validMovesForSelected = [];
        renderBoard();
        return;
      }
    }

    // Ninguna seleccion previa: seleccionar pieza del turno actual
    if (piece && piece.color === turn) {
      selectedSquare = { r, c };
      validMovesForSelected = getLegalMovesForSquare(r, c);
      renderBoard();
    }
  }

  // Abrir modal de coronacion
  function openPromotionModal(color) {
    elPromoChoices.innerHTML = '';
    const choices = ['q', 'r', 'b', 'n'];

    choices.forEach(type => {
      const btn = document.createElement('button');
      btn.className = 'promo-btn';
      btn.innerHTML = PIECE_SVGS[color + type.toUpperCase()];
      btn.title = { q: 'Reina', r: 'Torre', b: 'Alfil', n: 'Caballo' }[type];
      btn.onclick = () => {
        elPromoModal.close();
        if (pendingPromotion) {
          pendingPromotion.promoChoice = type;
          applyMove(pendingPromotion);
          pendingPromotion = null;
        }
      };
      elPromoChoices.appendChild(btn);
    });

    elPromoModal.showModal();
  }

  // Mostrar modal de fin de juego
  function showGameOver(title, desc) {
    gameOver = true;
    if (elGameOverModal.open) return;
    elGoTitle.textContent = title;
    elGoDesc.textContent = desc;
    // Icono acorde al resultado: trofeo si hubo ganador, manos si son tablas.
    if (elGoIcon) {
      elGoIcon.textContent = /tablas/i.test(title) ? '\u{1F91D}' : '\u{1F3C6}';
    }
    elGameOverModal.showModal();
  }

  // Renderizar piezas capturadas y calcular ventaja de material
  function renderCapturedAndMaterial() {
    const elTopCaptured = document.getElementById('top-captured');
    const elBottomCaptured = document.getElementById('bottom-captured');
    const elTopDiff = document.getElementById('top-material-diff');
    const elBottomDiff = document.getElementById('bottom-material-diff');

    elTopCaptured.innerHTML = '';
    elBottomCaptured.innerHTML = '';

    const isFlipped = settings.flipped || (settings.mode === 'ai' && settings.playerColor === 'b');
    const bottomColor = isFlipped ? 'b' : 'w';
    const topColor = isFlipped ? 'w' : 'b';

    let whiteMaterial = 0;
    let blackMaterial = 0;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p) {
          const val = PIECE_VALUES[p.type] || 0;
          if (p.color === 'w') whiteMaterial += val;
          else blackMaterial += val;
        }
      }
    }

    // Piezas que el jugador superior capturo (son piezas del color inferior)
    capturedPieces[bottomColor].forEach(type => {
      const mini = document.createElement('div');
      mini.className = 'captured-piece-mini';
      mini.innerHTML = PIECE_SVGS[bottomColor + type.toUpperCase()];
      elTopCaptured.appendChild(mini);
    });

    // Piezas que el jugador inferior capturo (son piezas del color superior)
    capturedPieces[topColor].forEach(type => {
      const mini = document.createElement('div');
      mini.className = 'captured-piece-mini';
      mini.innerHTML = PIECE_SVGS[topColor + type.toUpperCase()];
      elBottomCaptured.appendChild(mini);
    });

    // Diferencia
    const diff = (whiteMaterial - blackMaterial) / 100;
    elTopDiff.textContent = '';
    elBottomDiff.textContent = '';

    if (diff !== 0) {
      if (diff > 0) {
        if (bottomColor === 'w') elBottomDiff.textContent = `+${diff.toFixed(0)}`;
        else elTopDiff.textContent = `+${diff.toFixed(0)}`;
      } else {
        const absDiff = Math.abs(diff).toFixed(0);
        if (bottomColor === 'b') elBottomDiff.textContent = `+${absDiff}`;
        else elTopDiff.textContent = `+${absDiff}`;
      }
    }
  }

  // Renderizar la lista de movimientos
  function renderMovesLog() {
    elMoveCount.textContent = `${history.length} jugadas`;

    if (history.length === 0) {
      elMovesLog.innerHTML = `<div class="empty-history"><span>Empieza la partida moviendo una pieza blanca</span></div>`;
      return;
    }

    let html = `<table class="moves-table"><tbody>`;
    for (let i = 0; i < history.length; i += 2) {
      const moveNum = Math.floor(i / 2) + 1;
      const wMove = history[i] ? history[i].san : '';
      const bMove = history[i + 1] ? history[i + 1].san : '';
      html += `
        <tr>
          <td class="move-num">${moveNum}.</td>
          <td class="move-white">${wMove}</td>
          <td class="move-black">${bMove}</td>
        </tr>
      `;
    }
    html += `</tbody></table>`;
    elMovesLog.innerHTML = html;
    elMovesLog.scrollTop = elMovesLog.scrollHeight;
  }

  // Renderizar el tablero de 64 casillas
  function renderBoard() {
    elBoard.innerHTML = '';
    const isFlipped = settings.flipped || (settings.mode === 'ai' && settings.playerColor === 'b');
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    const kingInCheckPos = isKingInCheck(board, turn) ? findKing(board, turn) : null;

    for (let visualRow = 0; visualRow < 8; visualRow++) {
      for (let visualCol = 0; visualCol < 8; visualCol++) {
        const r = isFlipped ? 7 - visualRow : visualRow;
        const c = isFlipped ? 7 - visualCol : visualCol;

        const isDark = (r + c) % 2 === 1;
        const sq = document.createElement('div');
        sq.className = `square ${isDark ? 'dark' : 'light'}`;
        sq.dataset.r = r;
        sq.dataset.c = c;

        // Resaltar última jugada
        if (lastMove) {
          if ((lastMove.from.r === r && lastMove.from.c === c) || (lastMove.to.r === r && lastMove.to.c === c)) {
            sq.classList.add(isDark ? 'last-move-dark' : 'last-move-light');
          }
        }

        // Casilla seleccionada
        if (selectedSquare && selectedSquare.r === r && selectedSquare.c === c) {
          sq.classList.add('is-selected');
          // Si la pieza seleccionada no tiene jugadas legales, se marca para que
          // el usuario entienda que el clic ha funcionado pero no puede moverla.
          if (validMovesForSelected.length === 0) {
            sq.classList.add('no-moves');
          }
        }

        // Rey en jaque
        if (kingInCheckPos && kingInCheckPos.r === r && kingInCheckPos.c === c) {
          sq.classList.add('in-check');
        }

        // Coordenadas en las orillas
        if (visualCol === 0) {
          const rankLabel = document.createElement('span');
          rankLabel.className = 'coord-rank';
          rankLabel.textContent = ranks[r];
          sq.appendChild(rankLabel);
        }
        if (visualRow === 7) {
          const fileLabel = document.createElement('span');
          fileLabel.className = 'coord-file';
          fileLabel.textContent = files[c];
          sq.appendChild(fileLabel);
        }

        // Dibujar pieza si existe
        const piece = board[r][c];
        if (piece) {
          const pieceEl = document.createElement('div');
          pieceEl.className = 'piece';
          pieceEl.innerHTML = PIECE_SVGS[piece.color + piece.type.toUpperCase()];
          sq.appendChild(pieceEl);
        }

        // Marcar movimientos validos de la seleccion actual
        const validMove = validMovesForSelected.find(m => m.to.r === r && m.to.c === c);
        if (validMove) {
          if (piece) {
            const ring = document.createElement('div');
            ring.className = 'capture-ring';
            sq.appendChild(ring);
          } else {
            const dot = document.createElement('div');
            dot.className = 'move-dot';
            sq.appendChild(dot);
          }
        }

        sq.addEventListener('click', () => handleSquareClick(r, c));
        elBoard.appendChild(sq);
      }
    }

    // Actualizar barra de estado y etiquetas
    updateStatusText();
  }

  // Actualizar textos informativos
  function updateStatusText() {
    const isCheck = isKingInCheck(board, turn);
    const turnName = turn === 'w' ? 'Blancas' : 'Negras';
    const legalMoves = getAllLegalMoves(board, turn, enPassant, castling);
    const isMate = isCheck && legalMoves.length === 0;
    const isStalemate = !isCheck && legalMoves.length === 0;

    elTurnBadge.textContent = turnName;
    elTurnBadge.className = `th-badge ${turn === 'w' ? 'th-badge-accent' : ''}`;

    if (isMate) {
      // El bando al que le toca mover está mate: gana el contrario.
      const winner = turn === 'w' ? 'Negras' : 'Blancas';
      elStatus.textContent = `¡Jaque mate! Ganan las ${winner}`;
    } else if (isStalemate) {
      elStatus.textContent = 'Tablas por ahogado';
    } else if (isCheck) {
      elStatus.textContent = `¡Jaque a las ${turnName}!`;
    } else {
      if (settings.mode === 'ai') {
        const isPlayerTurn = turn === settings.playerColor;
        elStatus.textContent = isPlayerTurn ? `Tu turno (${turnName})` : `Turno de la IA (${turnName})`;
      } else {
        elStatus.textContent = `Turno de las ${turnName}`;
      }
      // Si el jugador ha seleccionado una pieza sin jugadas legales, se le indica.
      if (selectedSquare && validMovesForSelected.length === 0 && !isAiThinking) {
        elStatus.textContent = 'Esa pieza no tiene movimientos legales';
      }
    }
    // Jugadores en cabecera de tablero
    const isFlipped = settings.flipped || (settings.mode === 'ai' && settings.playerColor === 'b');
    const topName = document.getElementById('top-player-name');
    const bottomName = document.getElementById('bottom-player-name');
    const topIcon = document.getElementById('top-role-icon');
    const bottomIcon = document.getElementById('bottom-role-icon');

    if (isFlipped) {
      bottomName.textContent = settings.mode === 'ai' ? (settings.playerColor === 'b' ? 'Tú (Negras)' : 'IA (Negras)') : 'Negras';
      topName.textContent = settings.mode === 'ai' ? (settings.playerColor === 'w' ? 'Tú (Blancas)' : 'IA (Blancas)') : 'Blancas';
      bottomIcon.textContent = '♚';
      topIcon.textContent = '♔';
    } else {
      bottomName.textContent = settings.mode === 'ai' ? (settings.playerColor === 'w' ? 'Tú (Blancas)' : 'IA (Blancas)') : 'Blancas';
      topName.textContent = settings.mode === 'ai' ? (settings.playerColor === 'b' ? 'Tú (Negras)' : 'IA (Negras)') : 'Negras';
      bottomIcon.textContent = '♔';
      topIcon.textContent = '♚';
    }
  }

  function renderAll() {
    renderBoard();
    renderCapturedAndMaterial();
    renderMovesLog();
    renderClocks();
  }

  // ==========================================
  // CAPA DE ALMACENAMIENTO
  // Prioridad: plataforma TokenHarbor (window.th), luego localStorage del
  // navegador y, si este no está disponible (modo privado, bloqueos), memoria.
  // Así la app funciona igual servida en cualquier hosting estático.
  // ==========================================

  const STORAGE_PREFIX = 'ajedrez.';

  // Detección perezosa: localStorage puede lanzar excepción al accederlo.
  let storageAvailable = null;
  function hasLocalStorage() {
    if (storageAvailable !== null) return storageAvailable;
    try {
      const probe = '__probe__';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      storageAvailable = true;
    } catch (e) {
      storageAvailable = false;
    }
    return storageAvailable;
  }

  // Lee una clave. Devuelve el valor guardado o null si no existe.
  async function readStore(key) {
    if (window.th && window.th.session) {
      try { return await window.th.session.get(key); } catch (e) { /* cae al siguiente nivel */ }
    }
    if (hasLocalStorage()) {
      try {
        const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
        return raw === null ? null : JSON.parse(raw);
      } catch (e) { return null; }
    }
    return null;
  }

  // Escribe una clave. Silencioso ante fallos (cuota llena, modo privado).
  async function writeStore(key, value) {
    if (window.th && window.th.session) {
      try { await window.th.session.set(key, value); return; } catch (e) { /* cae al siguiente nivel */ }
    }
    if (hasLocalStorage()) {
      try { window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); } catch (e) {}
    }
  }

  // Guardar y recuperar sesión
  async function saveSession() {
    await writeStore('chess_v1_state', {
      clocks,
      gameOver,
      board,
      turn,
      castling,
      enPassant,
      halfMoveClock,
      fullMoveNumber,
      // boardBefore solo se usa para deshacer en memoria; no se persiste.
      history: history.map(rec => {
        const copy = { ...rec };
        delete copy.boardBefore;
        return copy;
      }),
      capturedPieces,
      lastMove,
      pendingPromotion,
      settings
    });
  }

  async function loadSession() {
    const saved = await readStore('chess_v1_state');
    try {
      if (saved && saved.board && saved.history) {
        board = saved.board;
        turn = saved.turn;
        castling = saved.castling;
        enPassant = saved.enPassant;
        halfMoveClock = saved.halfMoveClock;
        fullMoveNumber = saved.fullMoveNumber;
        history = saved.history;
        capturedPieces = saved.capturedPieces || { w: [], b: [] };
        lastMove = saved.lastMove;
        pendingPromotion = saved.pendingPromotion || null;
        if (saved.settings) settings = Object.assign(settings, saved.settings);
        if (saved.clocks) clocks = saved.clocks;
        else clocks = { w: settings.clockMinutes * 60000, b: settings.clockMinutes * 60000 };
        gameOver = !!saved.gameOver;
        isAiThinking = false;
        lastTick = Date.now();
        applySettingsUI();
        return true;
      }
    } catch (e) {}
    return false;
  }

  // Sincronizar UI de configuración
  function applySettingsUI() {
    // Botones de modo
    document.querySelectorAll('.mode-option').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.mode === settings.mode);
    });
    elModeBadge.textContent = settings.mode === 'ai' ? 'Contra IA' : '2 Jugadores';
    const aiDiffWrap = document.getElementById('ai-difficulty-wrap');
    if (aiDiffWrap) {
      aiDiffWrap.style.display = settings.mode === 'ai' ? 'flex' : 'none';
    }

    // Dificultad
    document.querySelectorAll('.diff-tab').forEach(tab => {
      tab.classList.toggle('is-on', tab.dataset.diff === settings.aiDifficulty);
    });

    // Color del jugador
    document.querySelectorAll('.color-pick-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.side === settings.playerColor);
    });

    document.querySelectorAll('.clock-tab').forEach(t => {
      t.classList.toggle('is-on', Number(t.dataset.clock) === settings.clockMinutes);
    });
    document.querySelectorAll('.theme-swatch').forEach(t => {
      t.classList.toggle('is-active', t.dataset.board === settings.boardTheme);
    });
    elBoard.dataset.board = settings.boardTheme;

    // Sonido
    if (elSoundIcon) {
      elSoundIcon.setAttribute('data-icon', settings.sound ? 'volume-2' : 'volume-x');
    }
  }

  // Event Listeners y Controles
  function setupEventListeners() {
    // Sonido On/Off
    elSoundBtn.addEventListener('click', async () => {
      settings.sound = !settings.sound;
      elSoundIcon.setAttribute('data-icon', settings.sound ? 'volume-2' : 'volume-x');
      if (window.th && window.th.storage) {
        try { await window.th.storage.set('chess_sound', settings.sound); } catch (e) {}
      } else {
        await writeStore('chess_sound', settings.sound);
      }
      saveSession();
    });

    // Compartir: usa la API de la plataforma si existe; si no, Web Share API
    // del navegador y, como último recurso, copia el enlace al portapapeles.
    elShareBtn.addEventListener('click', async () => {
      const text = '¡Ven a jugar una partida de ajedrez conmigo en Tablero de Ajedrez!';
      const url = window.location.href;

      if (window.th && window.th.share) {
        try {
          const res = await window.th.share({ text });
          if (res && res.how === 'copied') {
            elStatus.textContent = '¡Enlace copiado al portapapeles!';
            setTimeout(updateStatusText, 2500);
          }
          return;
        } catch (e) { /* continua con los otros métodos */ }
      }

      // Web Share API (movil y algunos navegadores de escritorio).
      if (navigator.share) {
        try {
          await navigator.share({ title: 'Tablero de Ajedrez', text, url });
          return;
        } catch (e) { return; /* el usuario canceló */ }
      }

      // Último recurso: copiar al portapapeles.
      try {
        await navigator.clipboard.writeText(url);
        elStatus.textContent = '¡Enlace copiado al portapapeles!';
      } catch (e) {
        elStatus.textContent = 'Copia el enlace de la barra de direcciones';
      }
      setTimeout(updateStatusText, 2500);
    });

    // Nueva Partida
    elNewBtn.addEventListener('click', () => {
      initBoard();
      saveSession();
      renderAll();
      if (settings.mode === 'ai' && settings.playerColor === 'b') {
        triggerAiMove();
      }
    });

    // Deshacer
    elUndoBtn.addEventListener('click', undoMove);

    // Boton rapido de modo: alterna entre IA y 2 jugadores y lleva el foco
    // al selector del panel lateral para ajustar el resto de opciones.
    elModeQuick.addEventListener('click', () => {
      settings.mode = settings.mode === 'ai' ? 'pvp' : 'ai';
      applySettingsUI();
      initBoard();
      saveSession();
      renderAll();
      if (settings.mode === 'ai' && settings.playerColor === 'b') {
        triggerAiMove();
      }
      const panel = document.querySelector('.mode-option');
      if (panel) panel.focus({ preventScroll: false });
    });

    // Girar tablero
    elFlipBtn.addEventListener('click', () => {
      settings.flipped = !settings.flipped;
      renderAll();
    });

    // Selector de modo
    document.querySelectorAll('.mode-option').forEach(btn => {
      btn.addEventListener('click', () => {
        settings.mode = btn.dataset.mode;
        applySettingsUI();
        initBoard();
        saveSession();
        renderAll();
        if (settings.mode === 'ai' && settings.playerColor === 'b') {
          triggerAiMove();
        }
      });
    });

    // Reloj
    document.querySelectorAll('.clock-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        settings.clockMinutes = Number(tab.dataset.clock);
        applySettingsUI();
        initBoard();
        saveSession();
        renderAll();
        if (settings.mode === 'ai' && settings.playerColor === 'b') triggerAiMove();
      });
    });

    // Color del tablero
    document.querySelectorAll('.theme-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        settings.boardTheme = sw.dataset.board;
        applySettingsUI();
        saveSession();
      });
    });

    // Selector de dificultad
    document.querySelectorAll('.diff-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        settings.aiDifficulty = tab.dataset.diff;
        applySettingsUI();
        saveSession();
      });
    });

    // Selector de bando para IA
    document.querySelectorAll('.color-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        settings.playerColor = btn.dataset.side;
        applySettingsUI();
        initBoard();
        saveSession();
        renderAll();
        if (settings.mode === 'ai' && settings.playerColor === 'b') {
          triggerAiMove();
        }
      });
    });

    // Modal fin de partida
    elRematchBtn.addEventListener('click', () => {
      elGameOverModal.close();
      initBoard();
      saveSession();
      renderAll();
      if (settings.mode === 'ai' && settings.playerColor === 'b') {
        triggerAiMove();
      }
    });

    elCloseModalBtn.addEventListener('click', () => {
      elGameOverModal.close();
    });

    // Cancelar la promoción (ESC o clic fuera): no se juega nada.
    elPromoModal.addEventListener('cancel', (ev) => {
      ev.preventDefault();
      elPromoModal.close();
      pendingPromotion = null;
      selectedSquare = null;
      validMovesForSelected = [];
      renderBoard();
    });
  }

  // Inicialización
  async function boot() {
    // La plataforma TokenHarbor es opcional: fuera de ella se usa localStorage.
    if (window.th) {
      try {
        if (typeof window.th.ready === 'function') await window.th.ready();
      } catch (e) { /* la app sigue funcionando sin plataforma */ }
    }

    const soundPref = (window.th && window.th.storage)
      ? await window.th.storage.get('chess_sound')
      : await readStore('chess_sound');
    if (soundPref !== null && soundPref !== undefined) {
      settings.sound = !!soundPref;
    }

    const restored = await loadSession();
    if (!restored) {
      initBoard();
    }

    applySettingsUI();
    setupEventListeners();
    renderAll();
    lastTick = Date.now();
    setInterval(tickClock, 250);

    // Reanudar estados que quedaron a medias antes de recargar.
    if (!gameOver && pendingPromotion) {
      openPromotionModal(turn);
    } else if (!gameOver && settings.mode === 'ai' && turn !== settings.playerColor) {
      triggerAiMove();
    }
  }

  // Arrancar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();