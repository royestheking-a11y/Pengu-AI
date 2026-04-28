const express = require('express');
const router = express.Router();
const factory = require('../controllers/factoryController');
const upload = require('../middleware/upload');

// Models
const Post = require('../models/Post');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Message = require('../models/Message');
const Subscriber = require('../models/Subscriber');
const Settings = require('../models/Settings');

// Helper to create routes
const createRoutes = (path, Model) => {
  router.get(`/${path}`, factory.getAll(Model));
  router.get(`/${path}/slug/:slug`, factory.catchAsync(async (req, res) => {
    const doc = await Model.findOne({ slug: req.params.slug });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  }));
  router.get(`/${path}/:id`, factory.getOne(Model));
  router.post(`/${path}`, factory.createOne(Model));
  router.patch(`/${path}/:id`, factory.updateOne(Model));
  router.delete(`/${path}/:id`, factory.deleteOne(Model));
};

// Define all API routes
createRoutes('posts', Post);
createRoutes('projects', Project);
createRoutes('testimonials', Testimonial);
createRoutes('services', Service);
createRoutes('jobs', Job);
createRoutes('applications', Application);
createRoutes('messages', Message);
createRoutes('subscribers', Subscriber);

// Settings is a bit special (usually only one doc)
router.get('/settings', factory.catchAsync(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.json(settings);
}));
router.patch('/settings', factory.catchAsync(async (req, res) => {
  let settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(settings);
}));

// File Upload Route
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: req.file.path });
});

module.exports = router;
