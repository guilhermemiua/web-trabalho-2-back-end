const routes = require('express').Router();

const UserController = require('../app/controllers/UserController');
const TransactionCategoryController = require('../app/controllers/TransactionCategoryController');
const TransactionController = require('../app/controllers/TransactionController');

const authMiddleware = require('../app/middlewares/auth');

routes.post('/users', UserController.create);
routes.post('/users/authenticate', UserController.authenticate);

// Authenticated routes
routes.use(authMiddleware);

routes.get('/users', UserController.findAll);
routes.get('/users/:id', UserController.findById);

routes.get('/transaction-categories', TransactionCategoryController.findAll);
routes.post('/transaction-categories', TransactionCategoryController.create);
routes.put('/transaction-categories/:id', TransactionCategoryController.update);
routes.get('/transaction-categories/:id', TransactionCategoryController.findById);
routes.delete('/transaction-categories/:id', TransactionCategoryController.delete);

routes.get('/me/transactions', TransactionController.findUserTransactions);
routes.get('/transactions', TransactionController.findAll);
routes.post('/transactions', TransactionController.create);
routes.put('/transactions/:id', TransactionController.update);
routes.delete('/transactions/:id', TransactionController.delete);

module.exports = routes;
