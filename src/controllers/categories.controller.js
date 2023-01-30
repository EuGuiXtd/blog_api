const CategoryService = require('../services/categories.service');

const addCategory = async (req, res) => {
    const { name } = req.body;
  
    const { type, message } = await CategoryService.addCategory(name);
  
    if (type) {
      return res.status(400).json({ message });
    }
  
    return res.status(201).json(message);
  };
  
module.exports = {
    addCategory,
};