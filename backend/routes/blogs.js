const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const ctrl = require('../controllers/blogController');

router.get('/', ctrl.getAll);
router.get('/slug/:slug', ctrl.getOne);
router.get('/:id', ctrl.getById);
router.post('/', protect, admin, ctrl.create);
router.put('/:id', protect, admin, ctrl.update);
router.delete('/:id', protect, admin, ctrl.remove);

module.exports = router;
