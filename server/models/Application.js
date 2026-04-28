const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  resume: String, // Cloudinary URL
  portfolio: String,
  message: String,
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
