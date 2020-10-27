const { User, Transaction } = require('../models');
const { encryptPassword } = require('../helpers');

class UserController {
  async create(request, response) {
    try {
      const {
        email,
        password,
      } = request.body;

      const userAlreadyExists = await User.findOne({
        where: {
          email,
        },
      });

      if (userAlreadyExists) {
        return response.status(401).json({ message: 'Email already registered' });
      }

      const passwordHashed = await encryptPassword(password);

      const user = await User.create({
        email,
        password: passwordHashed,
      });

      return response.status(201).json(user);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at user register' });
    }
  }

  async authenticate(request, response) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response.status(401).json({ message: 'Password or email incorrect' });
      }

      if (!(await user.checkPassword(password))) {
        return response.status(401).json({ message: 'Password or email incorrect' });
      }

      return response.status(200).json({ user, token: user.generateToken() });
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at authentication' });
    }
  }

  async findAll(request, response) {
    try {
      const { offset, limit } = request.query;

      let users;

      if (offset && limit) {
        users = await User.findAndCountAll({
          offset: Number(offset),
          limit: Number(limit),
          include: [
            {
              model: Transaction,
              as: 'transactions',
            },
          ],
        });
      } else {
        users = await User.findAll({
          include: [
            {
              model: Transaction,
              as: 'transactions',
            },
          ],
        });
      }

      return response.status(200).json(users);
    } catch (error) {
      return response.status(401).json({ message: 'Error at User Find All' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const user = await User.findByPk(Number(id), {
        include: [
          {
            model: Transaction,
            as: 'transactions',
          },
        ],
      });

      if (!user) {
        return response.status(401).json({ message: 'User not found' });
      }

      return response.status(200).json(user);
    } catch (error) {
      return response.status(401).json({ message: 'Error at User Find By Id' });
    }
  }
}

module.exports = new UserController();
