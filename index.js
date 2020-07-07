require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const logRoute = require('./routers/log-route') 
const userRoute = require('./routers/user.routes')
const cors = require('cors') 
const app = express();

const { PORT } = process.env;

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

userRoute(app);
logRoute(app);



app.listen(PORT, function(){
	console.log(`Server running in http://localhost:${PORT}`);
});