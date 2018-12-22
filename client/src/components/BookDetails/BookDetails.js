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
                        <h3>{book.name}</h3>
                        <h3>{book.genre}</h3>
                        <h3>{book.author.name}</h3>
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
           <p>Output book details here...</p>
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
