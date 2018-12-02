const _ = require('lodash');
const graphql = require('graphql');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt} = graphql;

// mock data

const books = [
    {name: 'Gone with the Wind', genre: 'Drama', id: '1'},
    {name: 'Empire Strikes Back', genre: 'Fantasy', id: '2'},
    {name: 'Everything there is to know about India', genre: 'Travel', id: '3'}
];

const authors = [
    {name: 'Ernest Hemingway', age: 61, id: '1'},
    {name: 'Mark Twain', age: 74, id: '2'},
    {name: 'Stephen King', age: 71, id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const Author = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to retrieve data from MongoDB
                console.log(typeof(args.id));
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: Author,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to retrieve data from MongoDB
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
