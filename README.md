# Undertow — building memory app (prototype)

A testable full-stack prototype of the concept: photograph a building, see its
history, browse comments sorted by likes, and watch "silhouettes" wander the
photo based on what people said they do there. Swipe/tap between **Present**
and **Past**.

The browser app is plain HTML/CSS/JS. Its Express API persists comments to a
local file during development and to Netlify Blobs when deployed.

## Run it locally

Install the locked dependencies, then start the frontend and API together:

```bash
npm ci
npm start
```

Then open **http://localhost:4000** in Chrome, Firefox, or Safari and allow
camera access when prompted. Use this command rather than a static-only server;
comments need the `/api/comments` routes in the Express process.

If you don't want to grant camera access, click **"upload photo instead"**
on the first screen — it uses a plain file picker and works identically.

## Testing on your phone (with a real camera)

There's no `.apk` here — building a real Android package needs the Android
SDK/Gradle toolchain, which isn't something I can produce from this chat.
This is a **PWA** instead: it can install onto your home screen with its
own icon and open full-screen like an app, no Play Store needed. That part
works today. The camera is the catch — mobile browsers only allow
`getUserMedia` (camera access) on `localhost` or a genuine **https** URL,
not on a plain `http://192.168.x.x` address on your local network. So:

**Recommended hosted path:**
1. Import this GitHub repository into Netlify and deploy the `main` branch.
2. Netlify uses `netlify.toml` to publish the frontend and route `/api/*` to
   the bundled Express function.
3. Open the resulting `https://something.netlify.app` URL on your phone,
   allow camera access, then use your
   browser's menu → **"Add to Home Screen"** (or **"Install app"** on
   Android Chrome) to get the icon/full-screen experience.

**Alternative if you'd rather not upload anywhere:** a tunneling tool like
`ngrok` (https://ngrok.com) can expose your laptop's local server
(`localhost:4000`) as a temporary https URL — run
`ngrok http 4000` alongside `npm start`, and use the
`https://...ngrok-free.app` URL it prints on your phone.

Without https, the app still works fine on your phone for everything
*except* the shutter button — use "upload photo instead" there, since
picking an existing photo doesn't need the same camera permission.

## AR-lite live view

When you take a photo with the shutter button (not the upload fallback),
the camera stream stays open. The result screen shows the **live feed**
behind the silhouettes instead of a frozen photo — you'll see a pulsing
"live" badge in the corner. This is screen-space overlay only (silhouettes
sit at fixed positions on the screen), not true world-anchored AR — there's
no plane detection or tracking, so the figures won't stay "pinned" to a
specific spot on the building if you move the camera. For that you'd need
WebXR / ARKit / ARCore with real device sensors, which isn't testable on a
laptop anyway. The "upload photo instead" path always falls back to a
static image, since there's no live stream to show.

## What's real vs. mocked right now

This prototype is fully interactive. Building recognition is still mocked so
you can test the experience without an AI API key:

- **Building recognition** — `runRecognition()` in `app.js` just picks one
  of three hand-written building profiles (`MOCK_BUILDINGS`) at random after
  a short fake "scanning" delay, regardless of what's in your photo.
- **Comments** — each mock building ships with seeded comments for the initial
  experience. New comments are saved through the backend and survive reloads.
  Likes are stored in that browser's local storage.

## Wiring up the real thing later

- Swap `runRecognition()` for a real vision call (e.g. send the captured
  `state.photoDataURL` to a Claude/vision endpoint or a landmark-recognition
  API), and replace `MOCK_BUILDINGS` lookup with a real DB fetch by
  building ID / geolocation.
- Each comment carries an `activity` field that drives its silhouette's
  movement pattern (`stepSilhouette()` in `app.js`): `wander`, `sit`,
  `meet`, `work`, `rush`, `watch`. Add more behaviors by adding a case
  there and an option in the `<select id="input-activity">` in
  `index.html`.
- For a real "past" photo (instead of the tinted/desaturated version of
  the present photo), swap the `<img id="stage-photo">` src per era and
  drop the CSS filter in `.stage.is-past .stage-photo`.

## Files

```
index.html   structure / screens
style.css    light/dark era themes and interaction animations
app.js       camera, mock recognition, silhouette simulation, comments
backend/     Express API, persistent comment store, hologram and landmark data
```
