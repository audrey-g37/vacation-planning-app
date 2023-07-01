const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const path = require('path');
require('dotenv').config();

const { typeDefs, resolvers } = require('./schema');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build/static')));
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
	});
});
