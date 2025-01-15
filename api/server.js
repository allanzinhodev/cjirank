const express = require('express');
const cors = require('cors');
const app = express();
const fightersRoutes = require('./fighters');

// Ordem dos middlewares
app.use(cors());  // CORS deve vir antes das rotas
app.use(express.json());  // Parse JSON

// Rotas da API
app.use('/api', fightersRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
