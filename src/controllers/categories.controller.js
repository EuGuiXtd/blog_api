const CategoryService = require('../services/categories.service');

const addCategory = async (req, res) => {
    const { name } = req.body;
  
    const { type, message } = await CategoryService.addCategory(name);
  
    if (type) {
      return res.status(400).json({ message });
    }
  
    return res.status(201).json(message);
  };

  const getAll = async (_req, res) => {
    const categories = await CategoryService.getAll();
    return res.status(200).json(categories);
  };
  
module.exports = {
    addCategory,
    getAll,
};