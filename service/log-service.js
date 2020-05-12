require('dotenv').config()
const mongoose = require('mongoose');
const LogModel = require('../models/log-model');

const { DB_URI } = process.env ;


let db = null;

const initConection = () =>{
    if(!db){
      mongoose.connect( DB_URI, {useNewUrlParser: true, useUnifiedTopology: true });
      db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        console.log(`conectado`);
      });
    }
  }


const pushLog = async (data) => {
  try {
    initConection();
    const log = new LogModel(data);
    const resPushLog = await log.save();
    return resPushLog;
  } catch (error) {
    console.log("Error al subir a DB", error)
  }

}

module.exports = pushLog;