const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancyController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', vacancyController.getVacancies);
router.post('/', authMiddleware, upload.single('image'), vacancyController.createVacancy);
router.put('/:id', authMiddleware, upload.single('image'), vacancyController.updateVacancy);
router.delete('/:id', authMiddleware, vacancyController.deleteVacancy);

module.exports = router;
