require('dotenv').config();
const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.controller');
const Auth = require('../middlewares/auth');

function userRoute(app) {
  app.use('/api/user', router);

  router.get('/', Auth.isAuth, userController.getUsers);
  router.get('/:id', Auth.isAuth, userController.getUser);
  router.post('/', userController.postUser);
  router.delete('/:id', Auth.isAuth, userController.deleteUser);
  router.put('/:id', Auth.isAuth, userController.putUser);
  router.post('/autenticar', userController.signIn);
}

module.exports = userRoute;
