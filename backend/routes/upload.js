const router = require('express').Router();
const { protect } = require('../middleware/auth');
const upload = require('../utils/upload');
const ctrl = require('../controllers/uploadController');

router.post('/', protect, upload.single('image'), ctrl.uploadImage);
router.post('/multiple', protect, upload.array('images', 10), ctrl.uploadMultiple);

module.exports = router;
