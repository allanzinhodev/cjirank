require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexão com Vercel
  }
});

pool.connect()
  .then(() => console.log("📦 Conectado ao banco de dados"))
  .catch(err => console.error("❌ Erro de conexão:", err));

module.exports = pool;
