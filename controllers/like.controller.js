const asyncHandler = require('express-async-handler');
const Like = require('../models/like.model');

const updateLike = async (query, update, options) => {
  return Like.findOneAndUpdate(query, update, options);
};

const toggleLike = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const user = req.user;

  if (!postId) {
    res.status(400);
    throw new Error('Please enter post ID');
  }

  const postExists = await Like.findOne({ post: postId });

  if (!postExists) {
    res.status(400);
    throw new Error('Please enter correct post ID');
  }

  let updatedLike;

  const alreadyLikedThenUnlike = await updateLike(
    { post: postId, 'like.user': user._id },
    {
      $pull: {
        like: { user: user._id },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (alreadyLikedThenUnlike) {
    res.status(200);
    updatedLike = alreadyLikedThenUnlike;
    res.json({
      message: 'The post has been unliked',
      'Number of likes on this post': updatedLike.like.length,
    });
  } else {
    updatedLike = await updateLike(
      { post: postId },
      {
        $push: {
          like: { user: user._id },
        },
      },
      { new: true, runValidators: true, upsert: true }
    );

    if (updatedLike) {
      res.status(201);
      res.json({
        'Number of likes on this post': updatedLike.like.length,
      });
    }
  }
});

module.exports = {
  toggleLike,
};
