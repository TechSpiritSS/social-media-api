const asyncHandler = require('express-async-handler');
const Post = require('../models/post.model');
const Like = require('../models/like.model');
const Comment = require('../models/comment.model');

const populatePostDetails = (query) => {
  return query
    .populate('user', 'name username')
    .populate('likes', 'like')
    .populate('comments', 'comment');
};

const createPost = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;
  const user = req.user;

  if (!title || !category || !description) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  const post = await Post.create({
    user: user.id,
    title,
    category,
    description,
  });

  if (!post) {
    res.status(500);
    throw new Error('Post could not be created');
  }

  const likes = await Like.create({ post: post._id });
  const comments = await Comment.create({ post: post._id });

  const postWithUserDetail = await populatePostDetails(
    Post.findByIdAndUpdate(
      post._id,
      { likes, comments },
      { new: true, runValidators: true }
    )
  );

  res.status(201).json(postWithUserDetail);
});

const getAllPosts = asyncHandler(async (_, res) => {
  const postsWithUserDetail = await populatePostDetails(Post.find());
  res.status(200).json(postsWithUserDetail);
});

const getPostById = asyncHandler(async (request, response) => {
  const postWithUserDetail = await Post.findById(request.params.id)
    .populate('user', 'name username')
    .populate('likes', 'like')
    .populate('comments', 'comment');
  response.status(200).json(postWithUserDetail);
});

const getMyPosts = asyncHandler(async (request, response) => {
  const user = request.user;

  const postsWithUserDetail = await Post.find({ user: user._id })
    .populate('user', 'name username')
    .populate('likes', 'like')
    .populate('comments', 'comment');
  response.status(200).json(postsWithUserDetail);
});

const getMyPost = asyncHandler(async (request, response) => {
  const user = request.user;
  const postWithUserDetail = await Post.find({
    user: user._id,
    _id: request.params.id,
  })
    .populate('user', 'name username')
    .populate('likes', 'like')
    .populate('comments', 'comment');
  response.status(200).json(postWithUserDetail);
});

const updateMyPost = asyncHandler(async (request, response) => {
  const user = request.user;

  const { title, category, description } = request.body;

  const updatedPostWithUserDetail = await Post.findOneAndUpdate(
    {
      user: user._id,
      _id: request.params.id,
    },
    { title, category, description },
    { new: true, runValidators: true }
  )
    .populate('user', 'name username')
    .populate('likes', 'like')
    .populate('comments', 'comment');

  if (!updatedPostWithUserDetail) {
    response.status(400);
    throw new Error('Please make sure the details entered are correct.');
  }

  response.status(200).json(updatedPostWithUserDetail);
});

const deleteMyPost = asyncHandler(async (request, response) => {
  const user = request.user;
  const deleted = await Post.findOneAndDelete({
    user: user._id,
    _id: request.params.id,
  });
  await Like.findOneAndDelete({
    post: request.params.id,
  });
  await Comment.findOneAndDelete({
    post: request.params.id,
  });

  if (!deleted) {
    response.status(400);
    throw new Error('It seems that the post has already been deleted.');
  }

  response.status(200).json({ success: true });
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  getMyPost,
  updateMyPost,
  deleteMyPost,
};
