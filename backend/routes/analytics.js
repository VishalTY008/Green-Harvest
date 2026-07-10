const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const ctrl = require('../controllers/analyticsController');

router.get('/dashboard', protect, admin, ctrl.getDashboard);
router.post('/track', ctrl.trackPage);

module.exports = router;
