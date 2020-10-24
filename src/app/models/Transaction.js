module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    transaction_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    Transaction.belongsTo(models.TransactionCategory, {
      as: 'transaction_category',
      foreignKey: 'transaction_category_id',
      targetKey: 'id',
    });
  };

  return Transaction;
};
