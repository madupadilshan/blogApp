const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    const post = new Post({
      title,
      content,
      image,
      author: req.user._id
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    let updateData = { title, content, updatedAt: Date.now() };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      updateData,
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  upload,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};