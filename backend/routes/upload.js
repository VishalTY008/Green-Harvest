const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const upload = require('../utils/upload');
const ctrl = require('../controllers/uploadController');

router.post('/', protect, admin, upload.single('image'), ctrl.uploadImage);
router.post('/multiple', protect, admin, upload.array('images', 10), ctrl.uploadMultiple);

module.exports = router;
