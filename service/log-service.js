require('dotenv').config();
const mongoose = require('mongoose');
const LogModel = require('../models/log-model');

const { DB_URI } = process.env;

let db = null;

const initConection = () => {
  if (!db) {
    mongoose
      .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('db is connected'));
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log(`conectado`);
    });
  }
};

const pushLog = async (data) => {
  try {
    //initConection();
    const log = new LogModel(data);
    const resPushLog = await log.save();
    return resPushLog;
  } catch (error) {
    console.log('Error al subir a DB', error);
  }
};

const searchLog = async () => {
  try {
    //initConection();
    resPushLog = [];
    for await (const log of LogModel.find()) {
      resPushLog.push(log);
    }
    return resPushLog;
  } catch (error) {
    console.log('Error al buscar', error);
  }
};

module.exports = { pushLog, searchLog, initConection };
