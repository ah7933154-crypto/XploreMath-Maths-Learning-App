const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  answer: Number,
  category: String
});

module.exports = mongoose.model('Question', QuestionSchema);
