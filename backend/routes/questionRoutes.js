const router = require('express').Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
  const q = await Question.find();
  res.json(q);
});

router.post('/', async (req, res) => {
  const q = await Question.create(req.body);
  res.json(q);
});

module.exports = router;
