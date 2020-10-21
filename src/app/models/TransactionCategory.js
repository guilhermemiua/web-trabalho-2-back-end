module.exports = (sequelize, DataTypes) => {
  const TransactionCategory = sequelize.define('TransactionCategory', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

  TransactionCategory.associate = (models) => {
    TransactionCategory.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    TransactionCategory.hasMany(models.Transaction, {
      as: 'transactions',
      foreignKey: 'transaction_category_id',
      targetKey: 'id',
    });
  };

  return TransactionCategory;
};
