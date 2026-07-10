const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const ctrl = require('../controllers/serviceController');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', protect, admin, ctrl.create);
router.put('/:id', protect, admin, ctrl.update);
router.delete('/:id', protect, admin, ctrl.remove);

module.exports = router;
