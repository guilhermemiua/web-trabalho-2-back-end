const { UserCategory } = require('../models');

class UserCategoryController {
  async create(request, response) {
    try {
      const {
        name,
      } = request.body;

      const userCategory = await UserCategory.create({
        name,
      });

      return response.status(201).json(userCategory);
    } catch (error) {
      return response.status(401).json({ message: 'Erro na criação da categoria' });
    }
  }

  async findAll(request, response) {
    try {
      const userCategories = await UserCategory.findAll();

      return response.status(200).json(userCategories);
    } catch (error) {
      return response.status(401).json({ message: 'Erro na busca das categorias' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const userCategory = await UserCategory.findByPk(Number(id));

      if (!userCategory) {
        return response.status(401).json({ message: 'Categoria não encontrada' });
      }

      return response.status(200).json(userCategory);
    } catch (error) {
      return response.status(401).json({ message: 'Erro na busca de categoria' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await UserCategory.destroy({
        where: {
          id: Number(id),
        },
      });

      return response.status(200).json({
        message: 'Deleted',
      });
    } catch (error) {
      if (error.message.indexOf('users_user_category_id_foreign')) {
        return response.status(401).json({ message: 'Esta categoria já está sendo usada por um Usuário' });
      }

      return response.status(401).json({ message: 'Erro na remoção da categoria' });
    }
  }
}

module.exports = new UserCategoryController();
