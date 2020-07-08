require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logRoute = require('./routers/log-route');
const userRoute = require('./routers/user.routes');
const { initConection } = require('./service/log-service');

const app = express();

const { PORT } = process.env;

const { log } = console;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initConection();

userRoute(app);
logRoute(app);

app.listen(PORT, () => {
  log(`Server running in http://localhost:${PORT}`);
});
