const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const port = 4000;
app.listen(4000, () => {
    console.log('Server is up and running on port', port);
});

