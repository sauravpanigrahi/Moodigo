const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'moodigo_dev',
    allowed_formats: ['png', 'jpg', 'jpeg', 'webp'], // Added webp
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: add transformations
  }
});

module.exports = {
  cloudinary,
  storage
};