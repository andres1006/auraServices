const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const { log, error } = console;

const userSchema = new Schema({
  usuario: { type: String, required: true },
  correo: { type: String, required: true, unique: true, lowercase: true },
  contrasenia: { type: String, required: true },
  hospital: { type: String, required: true },
  admin: { type: Boolean, required: false, default: false },
});

userSchema.pre('save', async (next) => {
  try {
    const hashedPassword = await bcrypt.hash(this.contrasenia, 10);
    this.contrasenia = hashedPassword;
    log(` Mi contra :  ${hashedPassword}`);
  } catch (e) {
    error(e);
    next(e);
  }
});
(userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.contrasenia, (err, isMatch) => {
    cb(err, isMatch);
  });
}),
  (module.exports = mongoose.model('Usuario', userSchema));
