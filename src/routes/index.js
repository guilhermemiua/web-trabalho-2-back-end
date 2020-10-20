const routes = require('express').Router();

const UserController = require('../app/controllers/UserController');
const UserCategoryController = require('../app/controllers/UserCategoryController');

const authMiddleware = require('../app/middlewares/auth');

routes.post('/users', UserController.create);
routes.post('/users/authenticate', UserController.authenticate);

routes.get('/user-categories', UserCategoryController.findAll);

// Authenticated routes
routes.use(authMiddleware);

routes.get('/users', UserController.findAll);
routes.get('/users/:id', UserController.findById);
routes.put('/users/:id', UserController.update);

routes.post('/user-categories', UserCategoryController.create);
routes.get('/user-categories/:id', UserCategoryController.findById);
routes.delete('/user-categories/:id', UserCategoryController.delete);

module.exports = routes;
