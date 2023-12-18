const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(id);

      if (!user) {
        res.status(401);
        throw new Error('User not authorized');
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        res.status(400);
        next(new Error('Invalid token'));
      } else {
        next(error);
      }
    }
  } else {
    res.status(400);
    next(new Error('Please login to access this!'));
  }
});

module.exports = protect;
