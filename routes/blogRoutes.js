const router = require('express').Router();
const blogController = require('../controllers/blogController');
router.post('/create-blog', blogController.createBlog);
router.get('/get-all-blogs', blogController.getAllBlog);
router.get('/get-blog/:id', blogController.getBlog);
router.patch('/update-blog/:id', blogController.updateBlog);
router.delete('/delete-blog/:id', blogController.deleteBlog);

module.exports = router;
