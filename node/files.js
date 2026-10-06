const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const UPLOAD_DIR = path.join(__dirname, 'uploads');

app.get('/files/:name', (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.name);
  res.send(fs.readFileSync(filePath, 'utf8'));
});

app.get('/thumbnail', (req, res) => {
  exec(`convert ${req.query.file} -resize 100x100 thumb.png`, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.sendFile(path.join(__dirname, 'thumb.png'));
  });
});

const cache = {};

app.get('/report/:userId', async (req, res) => {
  const { userId } = req.params;
  if (cache[userId]) {
    return res.json(cache[userId]);
  }
  const report = await buildReport(userId);
  cache[userId] = report;
  res.json(report);
});

async function buildReport(userId) {
  const files = fs.readdirSync(UPLOAD_DIR);
  let totalSize = 0;
  files.forEach(async (file) => {
    const stat = await fs.promises.stat(path.join(UPLOAD_DIR, file));
    totalSize += stat.size;
  });
  return { userId, fileCount: files.length, totalSize };
}

app.listen(process.env.PORT || 3000);
