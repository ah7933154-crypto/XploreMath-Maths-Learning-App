const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
