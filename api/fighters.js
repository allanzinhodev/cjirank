const express = require('express');
const router = express.Router();
const db = require('./db');

// 🔎 Rota para listar todos os lutadores
router.get('/fighters', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM fighter ORDER BY id ASC');
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

// 🔥 Rota para buscar as lutas de um lutador pelo ID
router.get('/fighters/:id/fight', async (req, res) => {
  const fighterId = req.params.id;
  const query = `
    SELECT f.id AS fight_id,
          CASE WHEN f.winner_id = $1 THEN 'WIN' ELSE 'LOSS' END AS outcome,
          CASE WHEN f.fighter_one_id = $1 THEN ft.name ELSE fo.name END AS opponent_name,
          CASE WHEN f.result IN ('Unanimous', 'Split') THEN 'Decision ' || f.result ELSE 'Submission [' || f.result || ']' END AS formatted_result,
          TO_CHAR((f.time / 60)::int, 'FM00') || ':' || TO_CHAR((f.time % 60)::int, 'FM00') AS formatted_time
    FROM fights f
    JOIN fighter fo ON fo.id = f.fighter_one_id
    JOIN fighter ft ON ft.id = f.fighter_two_id
    WHERE f.fighter_one_id = $1 OR f.fighter_two_id = $1
    ORDER BY f.id DESC;
  `;

  try {
    const result = await db.query(query, [fighterId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lutador não encontrado' });
    }

    // ✅ Retorna todas as lutas do lutador
    res.json(result.rows);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar lutas' });
  }
});


module.exports = router;
