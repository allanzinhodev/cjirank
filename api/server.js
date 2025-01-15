const express = require('express');
const cors = require('cors');
const app = express();
const fightersRoutes = require('./fighters');

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api', fightersRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
