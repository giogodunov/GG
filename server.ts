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

// Specific endpoint for travel guides
app.get('/api/guides', (req, res) => {
  const store = readStore();
  if (store && Array.isArray(store.guides)) {
    return res.json({ success: true, guides: store.guides });
  }
  return res.json({ success: false, guides: null });
});

app.post('/api/guides', (req, res) => {
  const current = readStore() || {};
  current.guides = req.body;
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return res.json({ success: true, guides: current.guides });
});

// Specific endpoint for inquiries
app.get('/api/inquiries', (req, res) => {
  const store = readStore();
  if (store && Array.isArray(store.inquiries)) {
    return res.json({ success: true, inquiries: store.inquiries });
  }
  return res.json({ success: false, inquiries: [] });
});

// Helper for escaping HTML in Telegram messages
function escapeTgHtml(str: string) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  text: string,
  buttons?: Array<Array<{ text: string; url: string }>>
) {
  try {
    const cleanToken = (botToken || '').trim();
    const cleanChatId = (chatId || '').trim();
    if (!cleanToken || !cleanChatId) {
      return { ok: false, description: 'Bot Token or Chat ID is missing' };
    }
    const url = `https://api.telegram.org/bot${cleanToken}/sendMessage`;
    const payload: any = {
      chat_id: cleanChatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };
    if (buttons && buttons.length > 0) {
      payload.reply_markup = { inline_keyboard: buttons };
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Telegram notification error:', error);
    return { ok: false, description: error.message };
  }
}

app.post('/api/inquiries', async (req, res) => {
  const current = readStore() || {};
  const data = req.body;
  let newSingleInquiry: any = null;

  if (Array.isArray(data)) {
    // Overwrite with full list of inquiries (e.g. after delete, status update, reorder)
    current.inquiries = data;
  } else if (data && typeof data === 'object') {
    // Append single new incoming inquiry
    newSingleInquiry = data;
    const inquiries = Array.isArray(current.inquiries) ? current.inquiries : [];
    current.inquiries = [data, ...inquiries];
  }
  current.updatedAt = new Date().toISOString();
  writeStore(current);

  // Send Telegram Notification if enabled and new inquiry arrived
  if (newSingleInquiry && current.settings?.telegramEnabled && current.settings?.telegramBotToken && current.settings?.telegramChatId) {
    try {
      const name = newSingleInquiry.customerName || 'სტუმარი';
      const phone = newSingleInquiry.phone || 'არ არის მითითებული';
      const email = newSingleInquiry.email || '';
      const itemTitle = newSingleInquiry.itemTitle || 'ზოგადი ჯავშანი / ტრანსფერი';
      const itemType = newSingleInquiry.itemType === 'tour' ? '🗺️ ტური' : newSingleInquiry.itemType === 'service' ? '🚗 სერვისი / ტრანსფერი' : '📩 ზოგადი მოთხოვნა';
      const preferredContact = newSingleInquiry.preferredContact === 'whatsapp' ? '💬 WhatsApp' : newSingleInquiry.preferredContact === 'call' ? '📞 სატელეფონო ზარი' : '✉️ ელფოსტა';
      const preferredDate = newSingleInquiry.preferredDate || '';
      const peopleCount = newSingleInquiry.peopleCount ? `${newSingleInquiry.peopleCount} ადამიანი` : '';
      const notes = newSingleInquiry.notes || '';
      const cleanPhone = phone.replace(/[^0-9]/g, '');

      let text = `🚀 <b>ახალი ჯავშანი საიტიდან!</b>\n\n`;
      text += `👤 <b>კლიენტი:</b> ${escapeTgHtml(name)}\n`;
      text += `📞 <b>ტელეფონი:</b> <code>${escapeTgHtml(phone)}</code>\n`;
      if (email) text += `✉️ <b>ელფოსტა:</b> ${escapeTgHtml(email)}\n`;
      text += `📲 <b>სასურველი კავშირი:</b> ${preferredContact}\n\n`;
      text += `📌 <b>სერვისი / ტური:</b> ${escapeTgHtml(itemTitle)} (${itemType})\n`;
      if (preferredDate) text += `📅 <b>სასურველი თარიღი:</b> ${escapeTgHtml(preferredDate)}\n`;
      if (peopleCount) text += `👥 <b>რაოდენობა:</b> ${escapeTgHtml(peopleCount)}\n`;
      if (notes) text += `📝 <b>შენიშვნა/დეტალები:</b> ${escapeTgHtml(notes)}\n`;
      text += `\n⏰ <i>${new Date().toLocaleString('ka-GE', { timeZone: 'Asia/Tbilisi' })}</i>`;

      const buttons: Array<Array<{ text: string; url: string }>> = [];
      if (cleanPhone) {
        buttons.push([
          {
            text: '💬 WhatsApp-ზე მიწერა',
            url: `https://wa.me/${cleanPhone}`
          }
        ]);
      }

      // Fire and log result
      sendTelegramMessage(
        current.settings.telegramBotToken,
        current.settings.telegramChatId,
        text,
        buttons
      ).then((res) => {
        if (!res.ok) {
          console.warn('Telegram send failed:', res);
        } else {
          console.log('Telegram booking notification sent successfully');
        }
      }).catch((err) => console.error('Telegram dispatch error:', err));
    } catch (e) {
      console.error('Error formatting telegram notification:', e);
    }
  }

  return res.json({ success: true, inquiries: current.inquiries });
});

// Endpoint for testing Telegram Bot connection directly from the Admin Panel
app.post('/api/telegram/test', async (req, res) => {
  const { botToken, chatId } = req.body;
  if (!botToken || !chatId) {
    return res.status(400).json({ success: false, error: 'გთხოვთ მიუთითოთ Bot Token და Chat ID' });
  }

  const testMessage = `✅ <b>InGeorgiaTours - ტესტური შეტყობინება</b>\n\nთქვენი Telegram Bot-ი წარმატებით დაუკავშირდა საიტს! 🎉\nროდესაც კლიენტი საიტზე ჯავშანს ან შეკითხვას გამოგზავნის, შეტყობინება მყისიერად მოგივათ აქ.\n\n⏰ <i>${new Date().toLocaleString('ka-GE', { timeZone: 'Asia/Tbilisi' })}</i>`;

  const result = await sendTelegramMessage(botToken, chatId, testMessage);
  if (result && result.ok) {
    return res.json({ success: true, result });
  } else {
    return res.status(400).json({
      success: false,
      error: result?.description || 'შეტყობინების გაგზავნა ვერ მოხერხდა. გადაამოწმეთ Token და Chat ID, ასევე დარწმუნდით, რომ ბოტში START გაქვთ დაჭერილი.'
    });
  }
});

app.delete('/api/inquiries/:id', (req, res) => {
  const current = readStore() || {};
  const idToDelete = req.params.id;
  const inquiries = Array.isArray(current.inquiries) ? current.inquiries : [];
  current.inquiries = inquiries.filter((inq: any) => inq && inq.id !== idToDelete);
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return res.json({ success: true, inquiries: current.inquiries });
});

// SEO routes: robots.txt and sitemap.xml
app.get('/googled97e390ba04d87c2.html', (req, res) => {
  res.type('text/html');
  res.send('google-site-verification: googled97e390ba04d87c2.html');
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: https://ingeorgiatours.ge/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const store = readStore();
  const toursList = store && Array.isArray(store.tours) ? store.tours : [];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://ingeorgiatours.ge/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ka" href="https://ingeorgiatours.ge/?lang=ka" />
    <xhtml:link rel="alternate" hreflang="en" href="https://ingeorgiatours.ge/?lang=en" />
  </url>
  <url>
    <loc>https://ingeorgiatours.ge/#tours</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ingeorgiatours.ge/#services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ingeorgiatours.ge/#guides</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ingeorgiatours.ge/#faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ingeorgiatours.ge/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

  toursList.forEach((tour: any) => {
    if (tour && tour.isActive) {
      xml += `
  <url>
    <loc>https://ingeorgiatours.ge/?tour=${encodeURIComponent(tour.id || '')}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
    }
  });

  xml += `\n</urlset>`;
  res.set('Content-Type', 'text/xml; charset=utf-8');
  res.send(xml);
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
