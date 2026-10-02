/**
 * Reverent Ambient Audio Engine using Web Audio API.
 * Synthesizes a warm, cathedral-like meditative drone with subtle overtones.
 * Completely autonomous: zero network downloads or external asset reliance.
 */

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.intervalId = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    // Warm Low-pass filter for Baroque cathedral warmth
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(2, this.ctx.currentTime);

    this.masterGain.connect(this.filter);
    this.filter.connect(this.ctx.destination);
  }

  start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    // Fade in master gain smoothly
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 3);

    // Fundamental frequencies: D2 (73.42Hz), A2 (110Hz), D3 (146.83Hz), F#3 (185Hz), A3 (220Hz)
    const baseFreqs = [73.42, 110.0, 146.83, 220.0];

    this.oscillators = baseFreqs.map((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle slow detune modulation (gentle organ swell effect)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(osc.detune);
      lfo.start();

      oscGain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start();

      return { osc, lfo };
    });

    this.isPlaying = true;
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;

    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

    setTimeout(() => {
      this.oscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          osc.disconnect();
          lfo.stop();
          lfo.disconnect();
        } catch {
          // ignore already stopped
        }
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 2000);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const ambientAudio = new AmbientAudioEngine();
