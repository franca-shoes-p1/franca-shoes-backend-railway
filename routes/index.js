const express = require('express');
const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'API Online', timestamp: new Date() });
});

// Produtos (mock data)
router.get('/produtos', (req, res) => {
  res.json({ produtos: [], message: 'Nenhum produto cadastrado' });
});

// Usuários registro
router.post('/usuarios/registrar', (req, res) => {
  res.json({ message: 'Endpoint de registro funcional', success: true });
});

module.exports = router;
