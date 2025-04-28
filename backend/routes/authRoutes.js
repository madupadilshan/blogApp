const express = require('express');
const { body } = require('express-validator');
const { register, login, logout } = require('../controllers/authController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/register',
  [
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  register
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  login
);

router.post('/logout', auth, logout);

module.exports = router;