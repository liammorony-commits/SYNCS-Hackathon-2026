const assert = require('node:assert/strict');
const fs = require('node:fs');
const { test } = require('node:test');

const css = fs.readFileSync(new URL('./style.css', `file://${__dirname}/`), 'utf8');
const app = fs.readFileSync(new URL('./app.js', `file://${__dirname}/`), 'utf8');

function rule(selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]+)\\}`));
  assert.ok(match, `Expected CSS rule for ${selector}`);
  return match[1];
}

test('comment likes use the requested colours in both themes', () => {
  assert.match(rule(':root'), /--comment-like-idle\s*:\s*#8c8c8c/);
  assert.match(rule(':root'), /--comment-like-active\s*:\s*#ffffff/);
  assert.match(rule('body.theme-light'), /--comment-like-idle\s*:\s*#6b6b6b/);
  assert.match(rule('body.theme-light'), /--comment-like-active\s*:\s*#111111/);
  assert.match(rule('.comment-likes'), /color\s*:\s*var\(--comment-like-idle\)/);
  assert.match(rule('.comment-likes.liked'), /color\s*:\s*var\(--comment-like-active\)/);
});

test('liking a comment runs both the plop and colour-fill animations', () => {
  const animationRule = rule('.comment-likes.just-liked');
  assert.match(animationRule, /heart-plop/);
  assert.match(animationRule, /like-colour-fill/);
  assert.match(css, /@keyframes\s+like-colour-fill/);
  assert.match(app, /classList\.add\("just-liked"\)/);
});
