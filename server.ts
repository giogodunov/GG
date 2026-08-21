import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// High body limits for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers for reading/writing persistent store
function readStore(): any {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading store file:', err);
  }
  return null;
}

function writeStore(data: any): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing store file:', err);
    return false;
  }
}

// ================= API ENDPOINTS =================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all application data
app.get('/api/data', (req, res) => {
  const store = readStore();
  if (store) {
    return res.json({ success: true, data: store });
  }
  return res.json({ success: false, data: null });
});

// Save all application data or merge
app.post('/api/data', (req, res) => {
  const current = readStore() || {};
  const updated = {
    ...current,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  const ok = writeStore(updated);
  if (ok) {
    return res.json({ success: true, data: updated });
  }
  return res.status(500).json({ success: false, error: 'Failed to write store' });
});

// Specific endpoint for settings
app.get('/api/settings', (req, res) => {
  const store = readStore();
  if (store && store.settings) {
    return res.json({ success: true, settings: store.settings });
  }
  return res.json({ success: false, settings: null });
});

app.post('/api/settings', (req, res) => {
  const current = readStore() || {};
  current.settings = req.body;
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return res.json({ success: true, settings: current.settings });
});

// Specific endpoint for tours
app.get('/api/tours', (req, res) => {
  const store = readStore();
  if (store && Array.isArray(store.tours)) {
    return res.json({ success: true, tours: store.tours });
  }
  return res.json({ success: false, tours: null });
});

app.post('/api/tours', (req, res) => {
  const current = readStore() || {};
  current.tours = req.body;
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return res.json({ success: true, tours: current.tours });
});

// Specific endpoint for services
app.get('/api/services', (req, res) => {
  const store = readStore();
  if (store && Array.isArray(store.services)) {
    return res.json({ success: true, services: store.services });
  }
  return res.json({ success: false, services: null });
});

app.post('/api/services', (req, res) => {
  const current = readStore() || {};
  current.services = req.body;
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return res.json({ success: true, services: current.services });
});

// Specific endpoint for inquiries
app.get('/api/inquiries', (req, res) => {
  const store = readStore();
  if (store && Array.isArray(store.inquiries)) {
    return res.json({ success: true, inquiries: store.inquiries });
  }
  return res.json({ success: false, inquiries: [] });
});

app.post('/api/inquiries', (req, res) => {
  const current = readStore() || {};
  const newInquiry = req.body;
  const inquiries = Array.isArray(current.inquiries) ? current.inquiries : [];
  current.inquiries = [newInquiry, ...inquiries];
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return res.json({ success: true, inquiry: newInquiry, inquiries: current.inquiries });
});

// ================= VITE / STATIC SERVING =================

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`InGeorgiaTours server running on http://localhost:${PORT}`);
  });
}

start();
