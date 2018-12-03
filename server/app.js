const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.connect('mongodb://testing:testing1@ds159024.mlab.com:59024/graphql-books', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
   console.log('Connected to mLab dB');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const port = 4000;
app.listen(4000, () => {
    console.log('Server is up and running on port', port);
});

