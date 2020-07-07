const UserService = require('../service/user.service');
const Usuario = require('../models/user.model');
const path = require('path');
module.exports = {
  async getUsers(req, res, next) 
  {
    const users = await UserService.getAllUsers();
      
    return res.status(200).send({ users });
    
  },

  async getUser(req, res, next)
   {
    const { id } = req.params;

    const user = await UserService.getUserById(id);

    return res.status(200).send({ user });
  },

  async postUser(req,res,next)
  {

    let usuario_recibido = new Usuario({
      usuario:req.body.usuario,
      correo:req.body.correo,
      contrasenia:req.body.contrasenia,
      hospital:req.body.hospital

    })
 

    const newUser = await UserService.postUser(usuario_recibido);

    return res.status(200).send({ newUser });
  },
  

      async putUser(req,res)
      {
        const {id}=req.params;
        let usuario_recibido = req.body;
        usuario_actualizado= await UserService.putUser(id,usuario_recibido);

        return res.status(200).send({usuario_actualizado});
      },

      async deleteUser(req,res)
      {
        const { id } = req.params;
        UserService.deleteUser(id);
        return res.status(200).send('Usuario Eliminado');
      },

      async signUp (req, res) {
        let user = new Usuario({
          usuario:req.body.usuario,
          correo:req.body.correo,
          contrasenia:req.body.contrasenia,
          hospital:req.body.hospital
        })
      //acá invoco el gravatar antes de que grabe el usuario
        user.save(async err => {
          if(err) return res.status(500).send({ message: 
            `Error al crear el usuario: ${err}`})
          let tokenGenerado = await UserService.createToken(user) 
    
          return res.status(200).send({ token: tokenGenerado})
        })
      },
      async signIn (req, res) {
        Usuario.findOne({ correo: req.body.correo }, (err, user) => {
             if (err) return res.status(500).send({ message: 
               `Error al ingresar: ${err}` })
             if (!user) return res.status(404).send({ message: 
               `No existe el usuario: ${req.body.correo}` })
            
             return user.comparePassword(req.body.contrasenia,
              async  (err, isMatch) => {
               if (err) return res.status(500).send(
                 { message: `Error al ingresar: ${err}` })
               if (!isMatch) return res.status(404).send(
                 { message: `Error de contraseña: ${req.body.correo}` })
         
               //req.user = user
               let tokenGenerado = await UserService.createToken(user)
               return res.status(200).send({ message: 
                 'Te has logueado correctamente', 
                 token: tokenGenerado})
             });      
           }).select('_id correo contrasena');
       },


};
