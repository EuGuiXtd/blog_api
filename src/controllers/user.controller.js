const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const addUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const payload = {
    email,
  };

  const { type, message } = await userService.addUser(displayName, email, password, image);

  const secret = process.env.JWT_SECRET || 'seusecretdetoken';

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  if (type === 'INPUTS_IN_USE') {
    return res.status(409).json({ message });
  }

  if (type) {
    return res.status(400).json({ message });
  }

  return res.status(201).json({ token });
};

module.exports = {
    addUser,
};