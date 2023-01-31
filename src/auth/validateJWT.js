// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

require('dotenv/config');
const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded.email);

    const user = await UserService.getAll(decoded.email);

    req.user = user[0].email;
    console.log('AQUI', req.user);

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};