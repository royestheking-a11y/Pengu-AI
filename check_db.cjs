const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./server/models/Project');

dotenv.config({ path: './server/.env' });

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const count = await Project.countDocuments();
    console.log('Project Count:', count);
    const docs = await Project.find();
    console.log('Projects:', JSON.stringify(docs, null, 2));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
