let audioContext;
let oscillator;
let deferredPrompt;



  // Optional fallback tip for unsupported browsers
document.addEventListener('DOMContentLoaded', () => {
// Audio control logic
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



// PWA install prompt

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();        // Avoid default browser prompt
  deferredPrompt = e;        // Save the event

  // Create custom banner
  const installBanner = document.createElement('div');
  installBanner.style = `
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: #f0f0f0;
    padding: 15px;
    text-align: center;
    box-shadow: 0 -2px 6px rgba(0,0,0,0.2);
  `;
  installBanner.innerHTML = `
    <span>Install <strong>Mosquito Repeller</strong> for a better experience.</span>
    <button id="triggerInstall" style="margin-left:10px;padding:8px 15px;">Install App</button>
  `;
  document.body.appendChild(installBanner);

  document.getElementById("triggerInstall").addEventListener("click", async () => {
    installBanner.remove();
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    alert(outcome === 'accepted' ? 'App installed!' : 'Maybe later.');
    deferredPrompt = null;
  });
});


  if (!window.matchMedia('(display-mode: standalone)').matches) {
    const tip = document.createElement('p');
    tip.textContent = "Tip: Use your browser menu to 'Add to Home screen'.";
    tip.style = 'color:gray; font-size:0.9rem; text-align:center; margin-top:20px;';
    document.body.appendChild(tip);
  }
});
 
