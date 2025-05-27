const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { judul, isi } = req.body;
  db.query('INSERT INTO todos (judul, isi) VALUES (?, ?)', [judul, isi], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, judul, isi });
  });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.put('/:id', (req, res) => {
  const { judul, isi } = req.body;
  db.query('UPDATE todos SET judul = ?, isi = ? WHERE id = ?', [judul, isi, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id: req.params.id, judul, isi });
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM todos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

module.exports = router;