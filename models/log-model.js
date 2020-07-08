const mongoose = require('mongoose');

const LogModel = mongoose.model(
  'Log',
  new mongoose.Schema({
    label: String,
    labelGlobal: String,
    accion: String,
    nombreProceso: String,
    estadoProceso: String,
    codigoProceso: Number,
    descripcion: String,
    fecha: Date,
  })
);

module.exports = LogModel;
