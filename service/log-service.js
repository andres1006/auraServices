require('dotenv').config();
const mongoose = require('mongoose');
const LogModel = require('../models/log-model');

const { log, error } = console;

const { DB_URI } = process.env;

let db = null;

const initConection = () => {
  if (!db) {
    mongoose
      .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => log('db is connected'));
    db = mongoose.connection;
    db.on('error', error.bind(console, 'connection error:'));
    db.once('open', () => {
      log(`conectado`);
    });
  }
};

const pushLog = async (data) => {
  try {
    // initConection();
    const logToSave = new LogModel(data);
    const resPushLog = await logToSave.save();
    return resPushLog;
  } catch (e) {
    log('Error al subir a DB', e);
  }
};

const searchLog = async () => {
  try {
    // initConection();
    const resPushLog = [];
    for await (const logs of LogModel.find()) {
      resPushLog.push(logs);
    }
    return resPushLog;
  } catch (e) {
    log('Error al buscar', e);
  }
};

module.exports = { pushLog, searchLog, initConection };
