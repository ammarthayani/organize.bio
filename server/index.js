const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

//Initializes app unsing express
const app = express();

// Then pass them to cors:
app.use(cors());


//Sets endpoint for /graphql route and passes in schema and passes in secret
app.use(
	'/graphql',
	graphqlHTTP({
		schema   : schema,
		graphiql : true,
		context  : {
			SECRET : process.env.SECRET
		}
	})
);

//Connects to the MongoDB database using mongoose
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true });

//When the connection is established this runs
mongoose.connection.on('open', () => {
	console.log('connected to database');
});

//starts app
app.listen((PORT = process.env.PORT), () => {
	console.log('now listening for requests on port ' + PORT);
});
