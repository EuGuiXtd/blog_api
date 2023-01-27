const jwt = require('jsonwebtoken');
const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { email, password } = req.body;

  const payload = {
    email,
  };

  const { type, message } = await loginService.login(email, password);

  const secret = process.env.JWT_SECRET || 'seusecretdetoken';

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  if (type) {
    return res.status(400).json({ message });
  }

  return res.status(200).json({ token });
};

module.exports = {
    login,
};
