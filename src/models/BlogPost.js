module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: {type: DataTypes.STRING, allowNull: false},
      content: {type: DataTypes.STRING, allowNull: false},
      userId: {type: DataTypes.INTEGER, allowNull: false},
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
      underscored: true,
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User,
          { foreignKey: 'id', as: 'user' });
      };
  
    return BlogPost;
  };