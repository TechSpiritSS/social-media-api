const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Failed to generate JWT token');
  }
};

module.exports = generateToken;
