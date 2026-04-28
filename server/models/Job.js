const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: String,
  location: String,
  type: String, // Full-time, Remote, etc.
  description: String,
  requirements: [String],
  salary: String,
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
