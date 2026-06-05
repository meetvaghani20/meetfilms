import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Meet@2005';
const DATA_DIR = join(__dirname, 'data');
const UPLOAD_DIR = join(__dirname, 'public', 'uploads');
const DATA_FILE = join(DATA_DIR, 'portfolio.json');
const DEFAULT_ASPECT_RATIO = '16 / 9';

async function ensureStorage() {
  await mkdir(DATA_DIR, { recursive: true });
  await mkdir(UPLOAD_DIR, { recursive: true });
}

async function readPortfolio() {
  await ensureStorage();
  try {
    const data = await readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writePortfolio(items) {
  await ensureStorage();
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2));
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify(body));
}

function isAdmin(request) {
  return request.headers['x-admin-password'] === ADMIN_PASSWORD;
}

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function parseMultipart(buffer, contentType) {
  const boundary = contentType.match(/boundary=(.+)$/)?.[1];
  if (!boundary) return { fields: {}, files: {} };

  const fields = {};
  const files = {};
  const parts = buffer.toString('latin1').split(`--${boundary}`);

  parts.forEach((part) => {
    if (!part.includes('Content-Disposition')) return;
    const cleanPart = part.replace(/^\r\n/, '').replace(/\r\n--\r\n?$/, '');
    const [headerBlock, ...contentParts] = cleanPart.split('\r\n\r\n');
    const content = contentParts.join('\r\n\r\n').replace(/\r\n$/, '');
    const name = headerBlock.match(/name="([^"]+)"/)?.[1];
    const filename = headerBlock.match(/filename="([^"]*)"/)?.[1];
    const type = headerBlock.match(/Content-Type:\s*([^\r\n]+)/)?.[1] ?? 'application/octet-stream';

    if (!name) return;
    if (filename) {
      files[name] = {
        filename,
        type,
        buffer: Buffer.from(content, 'latin1'),
      };
      return;
    }
    fields[name] = content;
  });

  return { fields, files };
}

function safeFileName(id, filename) {
  const extension = extname(filename) || '';
  const base = filename.replace(extension, '').replace(/[^a-z0-9_-]+/gi, '-').replace(/^-|-$/g, '');
  return `${id}-${base || 'upload'}${extension}`;
}

function normalizeAspectRatio(value, fallback = DEFAULT_ASPECT_RATIO) {
  const cleanedValue = value?.toString().trim();
  if (!cleanedValue) return fallback;

  const [width, height] = cleanedValue.split('/').map((part) => Number(part.trim()));
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return fallback;

  return `${Math.round(width)} / ${Math.round(height)}`;
}

async function saveUploadedFile(id, file) {
  if (!file?.buffer?.length) return null;
  const filename = safeFileName(id, file.filename);
  await writeFile(join(UPLOAD_DIR, filename), file.buffer);
  return `/uploads/${filename}`;
}

async function removeUploadedFile(url) {
  if (!url?.startsWith('/uploads/')) return;
  try {
    await unlink(join(__dirname, 'public', url));
  } catch {
    // The file may already be gone; the portfolio record can still be updated.
  }
}

async function handlePortfolioRequest(request, response) {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === 'GET') {
    const items = await readPortfolio();
    sendJson(response, 200, items);
    return;
  }

  if (!isAdmin(request)) {
    sendJson(response, 401, { error: 'Admin password required.' });
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const idFromPath = url.pathname.split('/').filter(Boolean)[2];

  if (request.method === 'DELETE') {
    const items = await readPortfolio();
    const item = items.find((entry) => entry.id === idFromPath);
    if (!item) {
      sendJson(response, 404, { error: 'Project not found.' });
      return;
    }

    await removeUploadedFile(item.videoUrl);
    await removeUploadedFile(item.thumbnailUrl);
    await writePortfolio(items.filter((entry) => entry.id !== idFromPath));
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method !== 'POST' && request.method !== 'PUT') {
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  const body = await readRequestBody(request);
  const { fields, files } = parseMultipart(body, request.headers['content-type'] ?? '');
  const items = await readPortfolio();
  const existing = request.method === 'PUT' ? items.find((entry) => entry.id === idFromPath) : null;

  if (request.method === 'PUT' && !existing) {
    sendJson(response, 404, { error: 'Project not found.' });
    return;
  }

  const id = existing?.id ?? randomUUID();
  const videoUrl = files.videoFile?.buffer?.length ? await saveUploadedFile(id, files.videoFile) : existing?.videoUrl;
  const thumbnailUrl = files.thumbnailFile?.buffer?.length
    ? await saveUploadedFile(id, files.thumbnailFile)
    : existing?.thumbnailUrl;

  if (!fields.title || !videoUrl) {
    sendJson(response, 400, { error: 'Title and video file are required.' });
    return;
  }

  if (existing && videoUrl !== existing.videoUrl) await removeUploadedFile(existing.videoUrl);
  if (existing && thumbnailUrl !== existing.thumbnailUrl) await removeUploadedFile(existing.thumbnailUrl);

  const item = {
    id,
    title: fields.title,
    category: fields.category,
    year: existing?.year ?? new Date().getFullYear().toString(),
    thumbnailUrl: thumbnailUrl || '',
    videoUrl,
    aspectRatio: normalizeAspectRatio(fields.aspectRatio, existing?.aspectRatio),
    createdAt: existing?.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };

  const nextItems = existing ? items.map((entry) => (entry.id === id ? item : entry)) : [item, ...items];
  await writePortfolio(nextItems);
  sendJson(response, 200, item);
}

createServer((request, response) => {
  if (request.url?.startsWith('/api/portfolio')) {
    handlePortfolioRequest(request, response).catch((error) => {
      sendJson(response, 500, { error: error.message });
    });
    return;
  }

  sendJson(response, 404, { error: 'Not found.' });
}).listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});
