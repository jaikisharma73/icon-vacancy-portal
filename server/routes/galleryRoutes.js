const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', galleryController.getGallery);
router.post('/', authMiddleware, upload.single('image'), galleryController.createGallery);
router.put('/:id', authMiddleware, upload.single('image'), galleryController.updateGallery);
router.delete('/:id', authMiddleware, galleryController.deleteGallery);

module.exports = router;
