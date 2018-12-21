import React from "react";
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import Spinner from './UI/Spinner/Spinner';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const BookList = props => {

    const displayBooks = () => {
        const data = props.data;
        if(data.loading){
            return <Spinner/>
        } else {
            return data.books.map((book) => {
                return (<li key={book.id}>{book.name}</li>
                );
            });
        }
    };

    console.log(props.data);
        return (
            <React.Fragment>
                <ul id='book-list'>
                    {displayBooks()}
                </ul>
            </React.Fragment>
        )
};

export default graphql(getBooksQuery)(BookList);
