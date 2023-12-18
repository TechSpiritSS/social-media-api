const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  setNewPassword,
} = require('../controllers/user.controller');
const protect = require('../middleware/auth');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.post('/forgot-password', forgotPassword);
router.post('/set-new-password', setNewPassword);

module.exports = router;
