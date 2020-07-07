require('dotenv').config()
const {Router} = require('express');
const router = Router();
const userController = require('../controllers/user.controller');

function userRoute(app) {
    app.use('/api/user', router);

    router.get('/', userController.getUsers);
    router.get('/:id', userController.getUser);
    router.post('/', userController.postUser);
    router.delete('/:id',userController.deleteUser);
    router.put('/:id',userController.putUser);
    router.post('/registrar', userController.signUp);
    router.post('/autenticar', userController.signIn);    

} 

module.exports= userRoute;

