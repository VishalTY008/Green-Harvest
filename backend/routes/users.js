const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const ctrl = require('../controllers/userController');

router.get('/', protect, admin, ctrl.getAll);
router.put('/:id/role', protect, admin, ctrl.updateRole);
router.delete('/:id', protect, admin, ctrl.remove);

module.exports = router;
