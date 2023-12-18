const express = require('express');
const router = express.Router();
const {
  addComment,
  deleteComment,
  updateComment,
} = require('../controllers/comment.controller');
const { toggleLike } = require('../controllers/like.controller');
const {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  getMyPost,
  updateMyPost,
  deleteMyPost,
} = require('../controllers/post.controller');
const protect = require('../middleware/auth');

router.post('/new', protect, createPost);
router.get('/all', protect, getAllPosts);
router.get('/all/:id', protect, getPostById);
router.get('/me', protect, getMyPosts);
router.get('/me/:id', protect, getMyPost);
router.put('/me/:id', protect, updateMyPost);
router.delete('/me/:id', protect, deleteMyPost);
router.post('/like', protect, toggleLike);
router.post('/comment', protect, addComment);
router.delete('/comment', protect, deleteComment);
router.put('/comment', protect, updateComment);

module.exports = router;
