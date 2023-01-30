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
  console.log(error);
  if (error) return error;

  await User.create({ displayName, email, password, image });
  return { type: null };
};

module.exports = {
    addUser,
};