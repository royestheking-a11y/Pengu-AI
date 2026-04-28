const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: String,
  tagline: String,
  email: String,
  phone: String,
  whatsapp: String,
  location: String,
  twitter: String,
  linkedin: String,
  facebook: String,
  instagram: String,
  metaTitle: String,
  metaDescription: String,
  announcementBar: String,
  announcementBarActive: Boolean,
  aiPlatformDemoVideoUrl: String,
  siteLogo: String,
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
