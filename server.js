const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rotas
const routes = require('./routes/index');

// Health check simples
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    server: 'Franca Shoes Backend',
    version: '5.1.0',
    bots: ['P6.1-WhatsApp', 'P6.2-Email', 'P6.3-Instagram', 'P6.4-YouTube'],
    timestamp: new Date().toISOString()
  });
});

// Registrar rotas da API
app.use('/api', routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log('=====================================');
  console.log('✅ P6.1 - WhatsApp Bot Online');
  console.log('✅ P6.2 - Email Bot Online');
  console.log('✅ P6.3 - Instagram Bot Online');
  console.log('✅ P6.4 - YouTube Bot Online');
  console.log('=====================================');
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log('=====================================');
});

module.exports = app;
