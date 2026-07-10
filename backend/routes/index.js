const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/crops', require('./crops'));
router.use('/products', require('./products'));
router.use('/blogs', require('./blogs'));
router.use('/contact', require('./contact'));
router.use('/testimonials', require('./testimonials'));
router.use('/faq', require('./faq'));
router.use('/services', require('./services'));
router.use('/users', require('./users'));
router.use('/upload', require('./upload'));
router.use('/analytics', require('./analytics'));

module.exports = router;
