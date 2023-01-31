module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
      },
  {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'post_id',
      otherKey: 'category_id',
      as: 'categories',
      through: models.PostCategory,
    });

    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'category_id',
      otherKey: 'post_id',
      as: 'posts',
      through: models.PostCategory,
    })
  }


  return PostCategory;
}