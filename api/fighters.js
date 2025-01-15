const express = require('express');
const router = express.Router();
const db = require('./db');

// 🔎 Rota para listar todos os lutadores
router.get('/fighters', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM fighter');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar os lutadores' });
  }
});

// 🔥 Rota para buscar um lutador específico pelo ID
router.get('/fighters/:id', async (req, res) => {
  const fighterId = req.params.id;

  try {
    const result = await db.query('SELECT * FROM fighter WHERE id = $1', [fighterId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lutador não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar o lutador' });
  }
});

module.exports = router;
