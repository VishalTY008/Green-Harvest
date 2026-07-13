const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const ctrl = require('../controllers/blogController');

router.get('/', ctrl.getAll);
router.get('/slug/:slug', ctrl.getOne);
router.get('/my', protect, ctrl.getMyBlogs);
router.get('/:id', ctrl.getById);
router.post('/', protect, admin, ctrl.create);
router.post('/user', protect, ctrl.createUserBlog);
router.put('/:id', protect, admin, ctrl.update);
router.put('/user/:id', protect, ctrl.updateMyBlog);
router.delete('/:id', protect, admin, ctrl.remove);
router.delete('/user/:id', protect, ctrl.deleteMyBlog);

module.exports = router;
