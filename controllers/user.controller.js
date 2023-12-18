const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const generateToken = require('../utilities/jwt');
const bcryptjs = require('bcryptjs');
const sendConfirmationCode = require('../mailer/mailer');

const registerUser = asyncHandler(async (request, response) => {
  const { name, email, username, password } = request.body;

  if (!name || !email || !username || !password) {
    response.status(400);
    throw new Error(
      'Please enter all fields including name, email, username and password'
    );
  }

  const byEmail = await User.findOne({ email });
  const byUsername = await User.findOne({ username });
  if (byEmail || byUsername) {
    response.status(400);
    throw new Error('It seems that user already exists. Please login instead!');
  }

  const salt = await bcryptjs.genSalt();
  const passwordHashed = await bcryptjs.hash(password, salt);

  const user = await User.create({
    name,
    email,
    username,
    password: passwordHashed,
  });

  response.status(201).send({
    success: 'User registered',
    username: user.username,
    token: generateToken(user._id),
  });
});

const loginUser = asyncHandler(async (request, response) => {
  const { email, username, password } = request.body;

  if (username || email) {
    if (!password) {
      throw new Error('Please enter your password');
    }
  } else {
    response.status(400);
    throw new Error('Please enter Email(or username) and password');
  }

  const byEmail = await User.findOne({ email });
  const byUsername = await User.findOne({ username });
  const user = byEmail || byUsername;
  if (!user) {
    throw new Error('User does not exist. Please register first!');
  }

  if (!(await bcryptjs.compare(password, user.password))) {
    response.status(400);
    throw new Error('Invalid credentials!');
  }

  response.send({
    success: 'Logged in',
    username: user.username,
    token: generateToken(user._id),
  });
});

const getUser = asyncHandler(async (request, response) => {
  const user = request.user;
  response.json({
    success: 'User details fetched',
    name: user.name,
    username: user.username,
  });
});

const forgotPassword = asyncHandler(async (request, response) => {
  const { email } = request.body;

  if (!email) {
    response.status(400);
    throw new Error('Please enter the email!');
  }

  const user = await User.findOne({ email });

  if (!user) {
    response.status(400);
    throw new Error(
      'Please check the entered email. It seems to be incorrect.'
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { forgotPasswordConfirmationCode: Math.floor(Math.random() * 9000 + 1000) },
    { new: true, runValidators: true }
  );

  sendConfirmationCode(updatedUser);

  response.json({
    success:
      'A code has been sent to your email. Please enter code, email and new password in the follow up request API.',
  });
});

const setNewPassword = asyncHandler(async (request, response) => {
  const { email, newPassword, code } = request.body;

  if (!email || !newPassword || !code) {
    response.status(400);
    throw new Error('Please enter all fields!');
  }

  const user = await User.findOne({ email });

  if (!user) {
    response.status(400);
    throw new Error(
      'Please check the entered email. It seems to be incorrect.'
    );
  }

  if (user.forgotPasswordConfirmationCode !== parseInt(code)) {
    await User.findByIdAndUpdate(
      user._id,
      {
        forgotPasswordConfirmationCode: Math.floor(Math.random() * 9000 + 1000),
      },
      { new: true, runValidators: true }
    );
    response.status(401);
    throw new Error(
      'Confirmation code entered is incorrect. Please request for another code.'
    );
  }

  const salt = await bcryptjs.genSalt();
  const newHashedPassword = await bcryptjs.hash(newPassword, salt);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      password: newHashedPassword,
      forgotPasswordConfirmationCode: Math.floor(Math.random() * 9000 + 1000),
    },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    response.status(500);
    throw new Error('Internal Server Error');
  }

  response.json({
    success: 'Password updated successfully!',
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  setNewPassword,
};
