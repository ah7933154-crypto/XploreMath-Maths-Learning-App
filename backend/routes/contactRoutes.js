const router = require('express').Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, message)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(name, email, message);

  res.json({ id: result.lastInsertRowid });
});

router.get('/', (req, res) => {
  const rows = db.prepare(
    "SELECT * FROM contacts ORDER BY createdAt DESC"
  ).all();

  res.json(rows);
});

module.exports = router;
