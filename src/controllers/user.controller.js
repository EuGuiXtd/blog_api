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

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(id);

  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  const { type, message } = await userService.getUserByEmail(email);

  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};
module.exports = {
    addUser,
    getAll,
    getUserById,
    getUserByEmail,
};