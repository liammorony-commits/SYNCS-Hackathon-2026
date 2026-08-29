# Undertow — building memory app (prototype)

A testable front-end prototype of the concept: photograph a building, see its
history, browse comments sorted by likes, and watch "silhouettes" wander the
photo based on what people said they do there. Swipe/tap between **Present**
and **Past**.

This is a static HTML/CSS/JS app — no build step, no server-side code. It's
built so you can test the whole interaction on your laptop's webcam before
ever touching a phone or a real backend.

## Run it locally

Camera access (`getUserMedia`) requires a "secure context" — browsers block
it on plain `file://` pages, but `localhost` counts as secure, so a trivial
local server is enough.

```bash
cd building-app
python3 -m http.server 8000
```

Then open **http://localhost:8000** in Chrome, Firefox, or Safari and allow
camera access when prompted. (Node users: `npx serve` works just as well.)

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

**Fastest path to a real https URL, no account needed:**
1. Go to https://app.netlify.com/drop in a browser on your laptop.
2. Drag the whole `building-app` folder onto the page.
3. It gives you a live `https://something.netlify.app` URL in seconds.
4. Open that URL on your phone, allow camera access, then use your
   browser's menu → **"Add to Home Screen"** (or **"Install app"** on
   Android Chrome) to get the icon/full-screen experience.

**Alternative if you'd rather not upload anywhere:** a tunneling tool like
`ngrok` (https://ngrok.com) can expose your laptop's local server
(`localhost:8000`) as a temporary https URL — run
`ngrok http 8000` alongside your `python -m http.server 8000`, and use the
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

This prototype is fully interactive, but two things are stubbed so you can
test the *experience* without any API keys or a backend:

- **Building recognition** — `runRecognition()` in `app.js` just picks one
  of three hand-written building profiles (`MOCK_BUILDINGS`) at random after
  a short fake "scanning" delay, regardless of what's in your photo.
- **Comments** — each mock building ships with a seeded set of comments
  (with likes counts, an activity tag, and past/present era) so sorting,
  silhouette behavior, and the spotlight/most-liked feature all have real
  data to work against. Anything you post through "+ add yours" is appended
  to that same in-memory list — it won't survive a page reload.

## Wiring up the real thing later

- Swap `runRecognition()` for a real vision call (e.g. send the captured
  `state.photoDataURL` to a Claude/vision endpoint or a landmark-recognition
  API), and replace `MOCK_BUILDINGS` lookup with a real DB fetch by
  building ID / geolocation.
- Replace the in-memory `state.comments` array with real API calls
  (fetch on load, POST on submit) — the render functions
  (`renderCommentsList`, `renderSpotlight`, `buildSilhouettes`) already
  re-run any time the comment list changes, so they don't need to change.
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
style.css    design system (present = amber, past = cyanotype blue)
app.js       camera, mock recognition, silhouette simulation, comments
```
