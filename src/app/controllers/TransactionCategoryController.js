const { TransactionCategory } = require('../models');

class TransactionCategoryController {
  async create(request, response) {
    try {
      const { userId } = request;
      const {
        name,
      } = request.body;

      const transactionCategory = await TransactionCategory.create({
        name,
        user_id: userId,
      });

      return response.status(201).json(transactionCategory);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at category create' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const {
        name,
      } = request.body;

      const transactionCategory = await TransactionCategory.update({
        name,
      }, {
        where: {
          id: Number(id),
        },
      });

      return response.status(201).json(transactionCategory);
    } catch (error) {
      return response.status(401).json({ message: 'Error at category update' });
    }
  }

  async findAll(request, response) {
    try {
      const transactionCategories = await TransactionCategory.findAll();

      return response.status(200).json(transactionCategories);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at categories search' });
    }
  }

  async findCategoriesByUser(request, response) {
    try {
      const { userId } = request;

      const transactionCategories = await TransactionCategory.findAll({
        where: {
          user_id: userId,
        },
      });

      return response.status(200).json(transactionCategories);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at categories search' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const transactionCategory = await TransactionCategory.findByPk(Number(id));

      if (!transactionCategory) {
        return response.status(401).json({ message: 'Category not found' });
      }

      return response.status(200).json(transactionCategory);
    } catch (error) {
      return response.status(401).json({ message: 'Error at category search' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await TransactionCategory.destroy({
        where: {
          id: Number(id),
        },
      });

      return response.status(200).json({
        message: 'Deleted',
      });
    } catch (error) {
      if (error.message.indexOf('transactions_transaction_category_id_foreign')) {
        return response.status(401).json({ message: 'This category is already being used by a transaction' });
      }

      return response.status(401).json({ message: 'Erro at delete category' });
    }
  }
}

module.exports = new TransactionCategoryController();
