const { Op } = require('sequelize');
const { User, BlogPost, Category, PostCategory } = require('../models');

const addPost = async (title, content, userEmail, categoryIds) => {
  const verify = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
   if (verify.length !== categoryIds.length) {
   return { type: 400, message: 'one or more "categoryIds" not found' };
  }
   const { id } = await User.findOne({ where: { email: userEmail } }); 
   const userId = id;
   const newPost = await BlogPost
   .create({ title, content, userId, updated: new Date(), published: new Date() });
 
   const category = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId })); 
   console.log(category);
   await PostCategory.bulkCreate(category); 
 
   return { type: null, message: newPost };
 };

const getAll = async () => {
  const post = await BlogPost.findAll({
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  
console.log(post[0].userId);
  return post;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  if (!post) {
    return { type: 'ID_NOT_FOUND', message: 'Post does not exist' };
  }
  return { type: null, message: post };
};

const attPost = async (id, title, content, userEmail) => {
  const post = await BlogPost.findOne({
    where: { id },
  });
  if (!post) return { type: 404, message: 'Post does not exist' };

  const idUser = await User.findOne({ where: { email: userEmail } });
  console.log('AQUI', idUser.id); 

  if (idUser.id !== post.userId) {
    return { type: 401, message: 'Unauthorized user' };
  }

  if (!title || !content) {
    return { type: 400, message: 'Some required fields are missing' };
  }

  await BlogPost.update({ title, content }, { where: { id } }); 
  const updatedBlog = getPostById(id);

   return updatedBlog;
};
module.exports = {
  getAll,
  addPost,
  getPostById,
  attPost,
};