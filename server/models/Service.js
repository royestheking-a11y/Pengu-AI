const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: String,
  tagline: String,
  description: { type: String, required: true },
  longDescription: String,
  image: String,
  features: [String],
  subServices: [{
    name: String,
    desc: String
  }],
  active: { type: Boolean, default: true },
  detailedContent: String,
  pricing: String,
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
