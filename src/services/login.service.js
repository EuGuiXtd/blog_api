const { User } = require('../models');

const login = async (email, password) => {
  if (!email || !password) {
    return { type: 'MISSING_VALUES', message: 'Some required fields are missing' };
  }

  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) {
    return { type: 'INVALID_INPUTS', message: 'Invalid fields' };
  }

  return { type: null };
};

module.exports = {
    login,
};