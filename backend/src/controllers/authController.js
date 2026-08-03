const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function register(req, res, next) {
  try {
    
    const { username, password } = req.body;
    const existing = await User.findOne({ where: { username } });
    
    if (existing) return res.status(409).json({ message: 'Username already exists' });
    
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    
    res.status(201).json({ id: user.id, username: user.username });
    
  } catch (error) {
    next(error);
  }
}



async function login(req, res, next) {
  try {
    
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });
    const ok = await bcrypt.compare(password, user.password);
    
    if (!ok) return res.status(401).json({ message: 'Invalid username or password' });
    res.json({ id: user.id, username: user.username });
    
  } catch (error) {
    next(error);
  }
}

function logout(_req, res) {
  res.json({ message: 'Logged out successfully' });
}

module.exports = { register, login, logout };

