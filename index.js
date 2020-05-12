require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const logRoute = require('./routers/log-route') 
const cors = require('cors') 
const app = express();

const { PORT } = process.env;

app.use(cors())
// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


logRoute(app);

// app.get('/', function(req, res){
// 	res.status(200).send({
// 		message: 'Hola Logs!'
// 	});
// });

app.listen(PORT, function(){
	console.log(`Server running in http://localhost:${PORT}`);
});