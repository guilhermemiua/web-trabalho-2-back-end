module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define('UserCategory', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

  UserCategory.associate = (models) => {
    UserCategory.hasOne(models.User, {
      as: 'user',
      foreignKey: 'user_category_id',
      targetKey: 'id',
    });
  };

  return UserCategory;
};
