let audioContext;
let oscillator;

document.getElementById("start").addEventListener("click", () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(17000, audioContext.currentTime); // 17 kHz
    oscillator.connect(audioContext.destination);
    oscillator.start();
  }
});

document.getElementById("stop").addEventListener("click", () => {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    audioContext.close();
    audioContext = null;
  }
});
