const router = require('express').Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/userProductController');

router.use(protect);
router.get('/', ctrl.getMyProducts);
router.post('/', ctrl.createMyProduct);
router.put('/:id', ctrl.updateMyProduct);
router.delete('/:id', ctrl.deleteMyProduct);

module.exports = router;
