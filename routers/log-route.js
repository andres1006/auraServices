require('dotenv').config();
const express = require('express');
const { pushLog, searchLog } = require('../service/log-service');

function logRoute(app) {
  const router = express.Router();
  app.use('/api/log', router);

  router.post('/', async function (req, res, next) {
    try {
      const { body } = req;
      const resLogPush = await pushLog(body);
      res.status(200).json({
        data: resLogPush,
        message: 'Log agregado correctamente',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/listarlogs', async function (req, res, next) {
    try {
      const { body } = req;
      const resLogPush = await searchLog(body);

      if (resLogPush) {
        res.status(200).json({
          data: resLogPush,
          message: 'Log encontrado',
        });
      } else {
        res.status(204).json({
          message: 'No hay logs',
        });
      }
    } catch (err) {
      next(err);
    }
  });
}

module.exports = logRoute;
