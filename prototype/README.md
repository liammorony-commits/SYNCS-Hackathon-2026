# Quadrangle Prototype — Local Run Instructions

This folder contains a static prototype of the Quadrangle app (UI-only). It does not require Node.js — you can serve it with a simple HTTP server and open it in your browser.

Quick start (recommended)

1. Open a terminal and change to this folder:

```bash
cd prototype
```

2. Serve the folder with Python 3's built-in server:

```bash
python3 -m http.server 5174
# Open http://localhost:5174 in your browser
```

Alternative servers

- PHP built-in server:

```bash
php -S 0.0.0.0:5174
```

- Any static file server will work (Caddy, nginx, etc.).

Files of interest

- `index.html` — redesigned home/result screen (glassmorphism layout).
- `style.css` — styles for the redesigned UI.
- `app.js` — UI behaviors: era toggle, timeline, moments, memory-layer, scan simulation.
- `app.js` and `index.html` are purposely kept plain JS so no build is required.

Behaviour notes

- Click the `SCAN` button to simulate recognition — floating memories will appear.
- Click any memory/timeline entry to open a modal with details.
- Use the `PAST` / `PRESENT` toggle to switch the era and update visible cards.

If you want a Node-based development workflow (Vite / React), see the `web-app/` folder at the repo root. The `web-static/` folder also contains a single-file React demo that runs without Node.

Troubleshooting

- If `python3` is not found, install Python 3 (Homebrew: `brew install python`).
- If a port is in use, pick another available port (e.g. `8000`).

Want me to add or change anything in the prototype files? Reply with what to modify and I'll update the files.
# Quadrangle Prototype (Expo)

This folder contains the React Native / Expo prototype for the Quadrangle app. It uses the local `App.tsx` entry and the `screens` / `components` you already created.

Quick start (run from `prototype`):

```bash
# install dependencies
npm install

# start Expo dev server
npm start

# open on device/emulator via the Expo UI or
npx expo start
```

Notes:
- If `expo` CLI is not installed globally, `npx expo` will work.
- If you prefer Yarn: `yarn` then `yarn start`.
