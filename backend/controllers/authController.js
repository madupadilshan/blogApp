const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const logout = async (req, res) => {
  // In a real app, you might want to implement token blacklisting
  res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };