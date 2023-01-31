// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log('AQUI 201', decoded.email);

    const user = decoded.email;

    req.user = user;
    console.log('AQUI 5', req.user);

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};