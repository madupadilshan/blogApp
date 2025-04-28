const express = require('express');
const { 
  upload, 
  createPost, 
  getAllPosts, 
  getPostById, 
  updatePost, 
  deletePost 
} = require('../controllers/postController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', auth, upload.single('image'), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;