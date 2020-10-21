const { Transaction, TransactionCategory } = require('../models');

class TransactionController {
  async create(request, response) {
    try {
      const { userId } = request;
      const {
        name,
        amount,
        transaction_category_id,
      } = request.body;

      const transaction = await Transaction.create({
        name,
        amount,
        transaction_category_id,
        user_id: userId,
      });

      return response.status(201).json(transaction);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at transaction create' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const {
        name,
        amount,
        transaction_category_id,
      } = request.body;

      const transaction = await Transaction.update({
        name,
        amount,
        transaction_category_id,
      }, {
        where: {
          id: Number(id),
        },
      });

      return response.status(201).json(transaction);
    } catch (error) {
      return response.status(401).json({ message: 'Error at transaction update' });
    }
  }

  async findAll(request, response) {
    try {
      const transactionCategories = await Transaction.findAll();

      return response.status(200).json(transactionCategories);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at transactiones search' });
    }
  }

  async findUserTransactions(request, response) {
    try {
      const transactionCategories = await Transaction.findAll({
        include: [
          {
            model: TransactionCategory,
            as: 'transaction_category',
          },
        ],
      });

      return response.status(200).json(transactionCategories);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at transactiones search' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const transaction = await Transaction.findByPk(Number(id));

      if (!transaction) {
        return response.status(401).json({ message: 'Transaction not found' });
      }

      return response.status(200).json(transaction);
    } catch (error) {
      return response.status(401).json({ message: 'Error at transaction search' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await Transaction.destroy({
        where: {
          id: Number(id),
        },
      });

      return response.status(200).json({
        message: 'Deleted',
      });
    } catch (error) {
      return response.status(401).json({ message: 'Erro at delete transaction' });
    }
  }
}

module.exports = new TransactionController();
