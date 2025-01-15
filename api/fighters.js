const express = require('express');
const router = express.Router();
const db = require('./db');

// Rota para listar lutadores
router.get('/fighters', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM fighter');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar os lutadores' });
  }
});

module.exports = router;
