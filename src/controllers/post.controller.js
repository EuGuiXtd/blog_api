const postService = require('../services/post.service');

const addPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    
    if (!title || !content || !categoryIds.length) {
    return res.status(400).json({ message: 'Some required fields are missing' });
    } 
    const { type, message } = await postService.addPost(title, content, req.user, categoryIds);
    if (type) {
      return res.status(type).json({ message });
    }
    res.status(201).json(message);
  };

const getAll = async (_req, res) => {
    const post = await postService.getAll();
    return res.status(200).json(post);
  };
  
  module.exports = {
    getAll,
    addPost,
};