const _ = require('lodash');
const graphql = require('graphql');
const book = require('../models/book');
const author = require('../models/author');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt, GraphQLList} = graphql;

// mock data

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent) {
                console.log(parent);
                // return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve(parent) {
                // return _.filter(books, {authorId: parent.id})
            }
        }
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
                // return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to retrieve data from MongoDB
                // return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve() {
                // return books;
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve() {
                // return authors;
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
