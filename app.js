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

let deferredPrompt;
const installBtn = document.createElement('button');
installBtn.textContent = "Install App";
installBtn.style.display = "none";
document.body.appendChild(installBtn);

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "inline-block";
});

installBtn.addEventListener('click', async () => {
  installBtn.style.display = 'none';
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        alert('Thanks! The app is now installing.');
      
    } else {
   alert('No problem! You can install it anytime.');
    }
    deferredPrompt = null;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(display-mode: standalone)').matches) {
    const msg = document.createElement('p');
    msg.textContent = "Tip: Add this app to your home screen for a better experience!";
    msg.style.color = "gray";
    msg.style.fontSize = "0.9rem";
    msg.style.textAlign = "center";
    msg.style.marginTop = "20px";
    document.body.appendChild(msg);
  }
});
