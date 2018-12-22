import React from "react";
import {graphql} from 'react-apollo';
import {getBookQuery} from '../../queries/queries';
import Spinner from '../UI/Spinner/Spinner';

const BookDetails = props => {

    console.log(props);
    const displayBookdetails = () => {
        if(!props.data.loading) {
            const {book} = props.data;
            if(book) {
                return (
                    <React.Fragment>
                        <h2>{book.name}</h2>
                        <h4>{book.genre}</h4>
                        <h4>{book.author.name}</h4>
                        <p><i>More books by this author:</i></p>
                        {book.author.books.map(authBook => {
                            return <ul key={authBook.id} className='other-books'>
                                <li key={authBook.id}><h5>{authBook.name}</h5></li>
                            </ul>
                        })}
                    </React.Fragment>
                )
            }
        }
    };

    return (
        <div id="details">
            {props.data.loading ? <Spinner /> : props.id ? displayBookdetails() : <i>No book selected</i>}
        </div>
    )
};

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.id
            }
        }
}
})(BookDetails);
