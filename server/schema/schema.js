const _ = require('lodash');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// mock data

const books = [
    {name: 'Gone with the Wind', genre: 'Drama', id: '1'},
    {name: 'Empire Strikes Back', genre: 'Fantasy', id: '2'},
    {name: 'Everything there is to know about India', genre: 'Travel', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                // code to retrieve data from MongoDB
                return _.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
