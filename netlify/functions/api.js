// Wraps the existing Express backend (backend/server.js) as a single
// Netlify Function, so the whole app can run on Netlify without a
// separate backend host. backend/server.js only calls app.listen() when
// run directly (require.main === module), so requiring it here just
// gives us the Express app to wrap, without starting a real server.
const serverless = require('serverless-http');
const app = require('../../backend/server');

const handleRequest = serverless(app);

module.exports.handler = async (event, context) => {
  // Depending on how Netlify rewrites the request, event.path may arrive
  // as the original "/api/..." path or as the function's own path
  // ("/.netlify/functions/api/..."). The Express routes below all expect
  // "/api/...", so normalise either form down to that before routing.
  if (event.path && event.path.includes('/.netlify/functions/api')) {
    event.path = event.path.replace(/^.*\/\.netlify\/functions\/api/, '/api');
  }
  return handleRequest(event, context);
};
