const schemas = require('./schemas');

const validateUser = (displayName, email, password) => {
  console.log(schemas.userSchema.validate);
    const { error } = schemas.userSchema.validate({ displayName, email, password });
    console.log('123', error);
    if (error) {
      return { type: 'INVALID_INPUTS', message: error.message };
    } return { type: null, message: '' };
  };

  const validateCategory = (name) => {
      const { error } = schemas.categorySchema.validate({ name });
      if (error) {
        return { type: 'INVALID_INPUT', message: error.message };
      } return { type: null, message: '' };
    };
module.exports = {
    validateUser,
    validateCategory,
  };