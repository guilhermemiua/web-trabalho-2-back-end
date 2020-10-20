module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'user_category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'user_categories',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'user_category_id');
  },
};
