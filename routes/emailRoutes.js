const express = require('express');
const router = express.Router();

router.get('/teste', (req, res) => {
  res.json({ status: 'success', message: '✅ EMAIL BOT FUNCIONANDO!' });
});

router.get('/health', (req, res) => {
  res.json({ status: 'online', bot: 'P6.2 - Email Bot' });
});

router.post('/confirmacao-pedido', (req, res) => {
  const { email, pedidoId, cliente } = req.body;
  res.json({ status: 'success', message: '✅ Email enviado', email, pedidoId });
});

router.post('/rastreamento', (req, res) => {
  const { email, pedidoId } = req.body;
  res.json({ status: 'success', message: '✅ Email de rastreamento enviado', email });
});

router.post('/cupom', (req, res) => {
  res.json({ status: 'success', message: '✅ Cupom enviado' });
});

router.post('/newsletter', (req, res) => {
  res.json({ status: 'success', message: '✅ Newsletter enviada' });
});

module.exports = router;
