const _ = require('lodash');
const graphql = require('graphql');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt} = graphql;

// mock data

const books = [
    {name: 'The Old Man and the Sea', genre: 'Fiction', id: '1', authorId: '1'},
    {name: 'Adventures of Huckleberry Finn', genre: 'Fiction', id: '2', authorId: '2'},
    {name: 'The Stand', genre: 'Fiction', id: '3', authorId: '3'}
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
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
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
            type: AuthorType,
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
