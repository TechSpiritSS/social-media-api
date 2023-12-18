const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment.model');

const findAndUpdateComment = async (query, update, options) => {
  return Comment.findOneAndUpdate(query, update, options);
};

const addComment = asyncHandler(async (req, res) => {
  const { postId, comment } = req.body;
  const user = req.user;

  if (!postId || !comment) {
    res.status(400);
    throw new Error('Please enter post ID and comment');
  }

  const postExists = await Comment.findOne({ post: postId });

  if (!postExists) {
    res.status(400);
    throw new Error('Please enter correct post ID');
  }

  const newComment = await findAndUpdateComment(
    { post: postId },
    {
      $push: {
        comment: { user: user._id, comment },
      },
    },
    { new: true, runValidators: true, upsert: true }
  );

  if (!newComment) {
    res.status(500);
    throw new Error('Something went wrong');
  }

  res.status(201).json(newComment);
});

const deleteComment = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.body;
  const user = req.user;

  const deleted = await findAndUpdateComment(
    { post: postId, 'comment.user': user._id, 'comment._id': commentId },
    {
      $pull: {
        comment: { user: user._id, _id: commentId },
      },
    },
    { new: true, runValidators: true }
  );

  if (!deleted) {
    res.status(500);
    throw new Error('Comment not deleted. Something went wrong.');
  }

  res.status(200);
  res.json({ success: 'Comment deleted' });
});

const updateComment = asyncHandler(async (req, res) => {
  const { postId, commentId, comment } = req.body;
  const user = req.user;

  const updated = await findAndUpdateComment(
    { post: postId, 'comment.user': user._id, 'comment._id': commentId },
    {
      $set: { 'comment.$[elem].comment': comment },
    },
    {
      arrayFilters: [{ 'elem.user': user.id, 'elem._id': commentId }],
      new: true,
      runValidators: true,
    }
  );

  if (!updated) {
    res.status(500);
    throw new Error('Comment not deleted. Something went wrong.');
  }

  res.status(200);
  res.json({ success: 'Comment updated', allCommentsOnThisPost: updated });
});

module.exports = {
  addComment,
  deleteComment,
  updateComment,
};
