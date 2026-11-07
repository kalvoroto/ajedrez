// ==========================================
// TH-KIT / FX
// Efectos de sonido sintetizados con WebAudio.
// API pública: window.fx.sound(nombre)
// ==========================================

(function () {
  'use strict';

  let ctx = null;

  function getContext() {
    if (ctx) return ctx;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    try {
      ctx = new AudioCtx();
    } catch (e) {
      ctx = null;
    }
    return ctx;
  }

  // Un tono con envolvente suave.
  function tone(freq, duration, type, volume, delay) {
    const audio = getContext();
    if (!audio) return;

    const start = audio.currentTime + (delay || 0);
    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume || 0.08, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(audio.destination);

    osc.start(start);
    osc.stop(start + duration + 0.02);
  }

  const SOUNDS = {
    tap:   () => tone(520, 0.06, 'triangle', 0.07),
    pop:   () => { tone(320, 0.08, 'square', 0.05); tone(180, 0.09, 'triangle', 0.05, 0.02); },
    tick:  () => { tone(880, 0.05, 'sine', 0.05); tone(1180, 0.05, 'sine', 0.04, 0.07); },
    magic: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'sine', 0.06, i * 0.07)); },
    fail:  () => { [392, 311, 233].forEach((f, i) => tone(f, 0.2, 'sawtooth', 0.04, i * 0.1)); }
  };

  function sound(name) {
    const audio = getContext();
    if (!audio) return;
    // Los navegadores suspenden el contexto hasta el primer gesto del usuario.
    if (audio.state === 'suspended') {
      audio.resume().catch(() => {});
    }
    const player = SOUNDS[name];
    if (player) player();
  }

  window.fx = { sound };
})();
