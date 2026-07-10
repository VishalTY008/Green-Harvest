const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, admin } = require('../middleware/auth');
const ctrl = require('../controllers/contactController');

router.post('/', [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('subject').notEmpty().withMessage('Subject required'),
  body('message').notEmpty().withMessage('Message required'),
  validate,
], ctrl.submit);

router.get('/', protect, admin, ctrl.getAll);
router.put('/:id/read', protect, admin, ctrl.markRead);
router.delete('/:id', protect, admin, ctrl.remove);

module.exports = router;
