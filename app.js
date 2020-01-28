const 	express = require('express');
const	path = require('path');
const	mongoose = require('./config/db');
const	cors = require('cors');
const	bodyParser = require('body-parser');
const	swaggerUi = require('swagger-ui-express');
const	swaggerJSDoc = require('swagger-jsdoc');
const 	app = express();
const 	router = require('./router');
const authMiddleware = require('./middleware/auth');
require('dotenv').config();

//Swagger document definition
const options = {
	definition: {
		info: {
			version: 1.0, // Version (Req)
			title: "CSFW", // Title (Req)
			description: "API for CSFW"
		}
	},
	//Path to API docs 
	apis: ["./routes/*"]
}
//Initialize swagger-js doc
const swaggerSpec = swaggerJSDoc(options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Express JS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/client')));
app.use('/', express.static(path.join(__dirname, 'dist/client')));
app.use(router)

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
	console.log("Connected to port: " + port)
})

//TODO: Add proper error handler

module.exports = app;