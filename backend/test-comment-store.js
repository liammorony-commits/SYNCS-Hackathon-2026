const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const fsSync = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { after, test } = require('node:test');

const testDirectory = fsSync.mkdtempSync(path.join(os.tmpdir(), 'undertow-comments-'));
process.env.COMMENTS_STORE_MODE = 'file';
process.env.COMMENTS_STORE_PATH = path.join(testDirectory, 'comments.json');

const {
  createComment,
  deleteComment,
  listComments,
  shouldUseNetlifyBlobs
} = require('./comment-store');

after(async () => {
  await fs.rm(testDirectory, { recursive: true, force: true });
});

test('selects Netlify Blobs in deployed functions, but not Netlify Dev', () => {
  assert.equal(shouldUseNetlifyBlobs({ SITE_ID: 'site-id' }), true);
  assert.equal(shouldUseNetlifyBlobs({ SITE_ID: 'site-id', NETLIFY_DEV: 'true' }), false);
  assert.equal(shouldUseNetlifyBlobs({ NETLIFY: 'true' }), false);
  assert.equal(shouldUseNetlifyBlobs({ COMMENTS_STORE_MODE: 'netlify-blobs' }), true);
  assert.equal(
    shouldUseNetlifyBlobs({ SITE_ID: 'site-id', COMMENTS_STORE_MODE: 'file' }),
    false
  );
});

test('creates, lists, authorizes, and deletes a persisted comment', async () => {
  const ownerKey = 'hashed-owner-key';
  const created = await createComment({
    buildingId: 'quadrangle',
    text: 'A test memory',
    activity: 'study',
    era: 'present',
    author: 'Test U.',
    contactPhone: '0400 000 000',
    ownerKey
  });

  const ownedComments = await listComments('quadrangle', ownerKey);
  assert.equal(ownedComments.length, 1);
  assert.equal(ownedComments[0].id, created.id);
  assert.equal(ownedComments[0].canDelete, true);
  assert.equal('ownerKey' in ownedComments[0], false);

  const publicComments = await listComments('quadrangle', null);
  assert.equal(publicComments[0].canDelete, false);

  assert.equal(await deleteComment('quadrangle', created.id, 'wrong-owner'), false);
  assert.equal(await deleteComment('quadrangle', created.id, ownerKey), true);
  assert.deepEqual(await listComments('quadrangle', ownerKey), []);
});
