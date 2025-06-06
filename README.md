# Communicator 🔊

A collection of audio-based tools designed for fun, utility, and experimentation — starting with a high-frequency **Mosquito Repeller** that only kids can hear (or so they say 👀).

## 🚀 Features

- ✅ High-frequency audio tone generator (17kHz)
- ✅ Installable as a Progressive Web App (PWA)
- ✅ Offline support via Service Worker
- ✅ Works on mobile and desktop browsers

## 📦 Current App: Mosquito Repeller

The initial tool plays a sound around 17,000 Hz — often perceptible only to younger ears. Great for playful experiments with your kids (or as a summoning bell 😄).

## 📲 Install Instructions (PWA)

1. Open the site in your browser (Chrome or Safari recommended).
2. Tap the browser menu (⋮ or share icon).
3. Choose **"Add to Home screen"** or **"Install App"**.
4. Done! The app will run offline too.

---

## 🧭 How It Works

```mermaid
flowchart TD
  A[Open App] --> B{Service Worker Installed?}
  B -- Yes --> C[Load Cached Files]
  B -- No --> D[Fetch Files & Register SW]
  C --> E[App Ready]
  D --> E
  E --> F{User Clicks Start}
  F --> G[Play 17kHz Tone]
  G --> H{User Clicks Stop}
  H --> I[Stop Audio]
