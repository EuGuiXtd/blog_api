module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: {type: DataTypes.INTEGER, allowNull: false},
      email: {type: DataTypes.INTEGER, allowNull: false},
      password: {type: DataTypes.INTEGER, allowNull: false},
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
    });
  
    return User;
  };