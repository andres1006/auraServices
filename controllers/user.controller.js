const UserService = require('../service/user-service');
const Usuario = require('../models/user.model');

const { error } = console;

module.exports = {
  async getUsers(req, res) {
    const users = await UserService.getAllUsers();

    return res.status(200).send({ users });
  },

  async getUser(req, res) {
    const { id } = req.params;

    const user = await UserService.getUserById(id);

    return res.status(200).send({ user });
  },

  async postUser(req, res) {
    try {
      const user = new Usuario({
        usuario: req.body.usuario,
        correo: req.body.correo,
        contrasenia: req.body.contrasenia,
        hospital: req.body.hospital,
        admin: req.body.admin,
      });
      await UserService.postUser(user);
      return res.status(200).send({ user });
    } catch (e) {
      error(e);
      return e;
    }
  },

  async putUser(req, res) {
    const { id } = req.params;
    const usuarioRecibido = req.body;
    const usuarioActualizado = await UserService.putUser(id, usuarioRecibido);

    return res.status(200).send({ usuarioActualizado });
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    UserService.deleteUser(id);
    return res.status(200).send('Usuario Eliminado');
  },

  async signIn(req, res) {
    Usuario.findOne({ correo: req.body.correo }, (err, user) => {
      if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` });
      if (!user)
        return res.status(404).send({ message: `No existe el usuario: ${req.body.correo}` });

      return user.comparePassword(
        req.body.contrasenia,

        async (errCallBack, isMatch) => {
          if (errCallBack)
            return res.status(500).send({ message: `Error al ingresar: ${errCallBack}` });
          if (!isMatch)
            return res.status(404).send({
              message: `Error de contraseña: ${req.body.contrasenia}`,
            });

          // req.user = user
          const tokenGenerado = await UserService.createToken(user);
          return res.status(200).send({
            message: 'Te has logueado correctamente',
            token: tokenGenerado,
            user,
          });
        }
      );
    });
  },
};
