const { User } = require('../models');
const validations = require('./validations/validationsInputsValues');

const addUser = async (displayName, email, password, image) => {
  const user = await User.findOne({
    where: { email },
  });
  if (user) {
    return { type: 'INPUTS_IN_USE', message: 'User already registered' };
  }
  const error = validations.validateUser(displayName, email, password);
  if (error.type) return error;

  console.log('AQUI', await User.create({ displayName, email, password, image }));
  return { type: null };
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  return users;
};
const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  if (!user) {
    return { type: 'ID_NOT_FOUND', message: 'User does not exist' };
  }
  return { type: null, message: user };
};

module.exports = {
    addUser,
    getAll,
    getUserById,
};