const { Category } = require('../models');
const validations = require('./validations/validationsInputsValues');

const addCategory = async (name) => {
  const error = validations.validateCategory(name);
  if (error.type) return error;
    const Categories = await Category.create({ name });
    return { type: null, message: Categories };
  };

  const getAll = async () => {
    const Categories = await Category.findAll({
      attributes: ['id', 'name'],
    });
  
    return Categories;
  };
  module.exports = {
    addCategory,
    getAll,
};