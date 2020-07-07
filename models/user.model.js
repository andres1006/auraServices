const mongoose = require('mongoose')
const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  usuario:{type:String,required:true},
  correo:{type:String,required:true,unique:true,lowercase:true},
  contrasenia:{type:String,required:true},
  hospital:{type:String,required:true}
});

userSchema.pre("save",function (next)  {
  var user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.contrasenia, salt, null, (err, hash) => {
      if (err) return next(err)
      this.contrasenia = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, cb)
 {
  bcrypt.compare(candidatePassword, this.contrasenia, (err, isMatch) => {
    cb(err, isMatch)
  });
}




module.exports = mongoose.model('Usuario', userSchema);
