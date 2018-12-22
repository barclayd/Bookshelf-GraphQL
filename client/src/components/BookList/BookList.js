import React, {Component} from "react";
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../../queries/queries';
import Spinner from '../UI/Spinner/Spinner';
import BookDetails from '../BookDetails/BookDetails';

class BookList extends Component {

    state = {
        selectedId: null
    };

    render () {

        const bookClickHandler = id => {
            this.setState({
                selectedId: id
            })
        };

        const displayBooks = () => {
            const data = this.props.data;
            if (data.loading) {
                return <Spinner/>
            } else {
                return data.books.map((book) => {
                    return (<li onClick={() => bookClickHandler(book.id)} key={book.id}>{book.name}</li>
                    );
                });
            }
        };

        return (
            <React.Fragment>
                <ul id='book-list'>
                    {displayBooks()}
                </ul>
                <BookDetails id={this.state.selectedId}/>
            </React.Fragment>
        )
    }
}

export default graphql(getBooksQuery)(BookList);
