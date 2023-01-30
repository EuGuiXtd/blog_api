const { Category } = require('../models');
const validations = require('./validations/validationsInputsValues');

const addCategory = async (name) => {
  const error = validations.validateCategory(name);
  if (error.type) return error;
    const Categories = await Category.create({ name });
    return { type: null, message: Categories };
  };

  module.exports = {
    addCategory,
};