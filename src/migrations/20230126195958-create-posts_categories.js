'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        primarykey: true,
        type:Sequelize.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        onUpdate: 'Cascade',
        onDelete: 'Cascade'
      },
      category_id: {
        allowNull: false,
        primarykey: true,
        type:Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'Cascade',
        onDelete: 'Cascade'
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_categories');
  }
};