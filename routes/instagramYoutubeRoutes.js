const express = require('express');
const router = express.Router();

// Instagram
router.get('/instagram/health', (req, res) => {
  res.json({ status: 'online', bot: 'P6.3 - Instagram Bot' });
});

router.post('/instagram/postar', (req, res) => {
  res.json({ status: 'success', message: '✅ Post Instagram enviado' });
});

// YouTube
router.get('/youtube/health', (req, res) => {
  res.json({ status: 'online', bot: 'P6.4 - YouTube Bot' });
});

router.post('/youtube/upload', (req, res) => {
  res.json({ status: 'success', message: '✅ Vídeo enviado' });
});

module.exports = router;
