const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pengu-assets',
    allowed_formats: ['jpg', 'png', 'jpeg', 'svg', 'pdf', 'webp'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
