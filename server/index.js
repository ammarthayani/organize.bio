const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const {ApolloServer, gql} = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')

//Initializes app unsing express
const app = express();

// Then pass them to cors:
app.use(cors());



// A map of functions which return data for the schema.


//Sets endpoint for /graphql route and passes in schema and passes in secret
const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.applyMiddleware({app})

//Connects to the MongoDB database using mongoose
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true });

//When the connection is established this runs
mongoose.connection.on('open', () => {
	console.log('connected to database');
});

//starts app
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
