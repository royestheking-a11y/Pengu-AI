const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  content: { type: String, required: true },
  category: String,
  image: String,
  author: String,
  date: { type: Date, default: Date.now },
  published: { type: Boolean, default: true },
  readTime: String,
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
