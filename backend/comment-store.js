const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const useNetlifyBlobs = process.env.NETLIFY === 'true' && process.env.NETLIFY_DEV !== 'true';

const storePath = process.env.COMMENTS_STORE_PATH
  ? path.resolve(process.env.COMMENTS_STORE_PATH)
  : path.join(process.cwd(), '.local-data', 'comments.json');

let writeQueue = Promise.resolve();

async function readAll() {
  try {
    const contents = await fs.readFile(storePath, 'utf8');
    const parsed = JSON.parse(contents.replace(/^\uFEFF/, ''));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeAll(comments) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  const temporaryPath = `${storePath}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(comments, null, 2)}\n`, 'utf8');
  await fs.rename(temporaryPath, storePath);
}

function update(mutator) {
  const operation = writeQueue.then(async () => {
    const comments = await readAll();
    const result = await mutator(comments);
    await writeAll(comments);
    return result;
  });
  writeQueue = operation.catch(() => {});
  return operation;
}

async function listComments(buildingId, ownerKey) {
  if (useNetlifyBlobs) {
    const store = netlifyStore();
    const { blobs } = await store.list({ prefix: `${buildingId}/` });
    const comments = (await Promise.all(blobs.map((blob) => store.get(blob.key, { type: 'json' })))).filter(Boolean);
    return publicComments(comments, ownerKey);
  }
  await writeQueue;
  const comments = await readAll();
  return publicComments(comments.filter((comment) => comment.buildingId === buildingId), ownerKey);
}

function publicComments(comments, ownerKey) {
  return comments
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
    .map(({ ownerKey: storedOwnerKey, ...comment }) => ({
      ...comment,
      canDelete: Boolean(ownerKey && storedOwnerKey && ownerKey === storedOwnerKey)
    }));
}

async function createComment(input) {
  const comment = {
    id: `c_user_${crypto.randomUUID()}`,
    buildingId: input.buildingId,
    text: input.text,
    activity: input.activity,
    customActivity: input.customActivity || null,
    era: input.era,
    author: input.author,
    contactPhone: input.contactPhone,
    profilePhoto: input.profilePhoto || null,
    photo: input.photo || null,
    likes: 0,
    timestamp: new Date().toISOString(),
    ownerKey: input.ownerKey
  };
  if (useNetlifyBlobs) {
    await netlifyStore().setJSON(`${comment.buildingId}/${comment.id}`, comment);
    return comment;
  }
  return update((comments) => {
    comments.push(comment);
    return comment;
  });
}

async function deleteComment(buildingId, commentId, ownerKey) {
  if (useNetlifyBlobs) {
    const store = netlifyStore();
    const key = `${buildingId}/${commentId}`;
    const comment = await store.get(key, { type: 'json' });
    if (!comment?.ownerKey || !ownerKey || comment.ownerKey !== ownerKey) return false;
    await store.delete(key);
    return true;
  }
  return update((comments) => {
    const index = comments.findIndex(
      (comment) => comment.buildingId === buildingId && comment.id === commentId &&
        comment.ownerKey && ownerKey && comment.ownerKey === ownerKey
    );
    if (index === -1) return false;
    comments.splice(index, 1);
    return true;
  });
}

function netlifyStore() {
  const { getStore } = require('@netlify/blobs');
  return getStore({ name: 'undertow-comments', consistency: 'strong' });
}

module.exports = { listComments, createComment, deleteComment, storePath };
