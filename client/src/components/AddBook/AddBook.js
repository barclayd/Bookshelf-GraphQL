import React, {Component} from "react";
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../../queries/queries';

class AddBook extends Component {

    state = {
        bookName: '',
        genre: '',
        authorId: ''
    };

    inputChangeHandler = (label, event) => {
        const input = event.target.value;
        this.setState({
            [label]: input
        })
    };

    onFormSubmitHandler = () => {
        if((this.state.authorId && this.state.genre && this.state.bookName) !== '') {
            console.log(this.state);
            this.props.addBookMutation({
                variables: {
                    name: this.state.bookName,
                    genre: this.state.genre,
                    authorId: this.state.authorId
                },
            refetchQueries: [{query: getBooksQuery }]
            });
            this.setState({
                bookName: '',
                genre: '',
                authorId: ''
            })
        } else {
            alert('Please enter in all fields');
        }
    };

    render() {
        const getAuthors = () => {
            const data = this.props.getAuthorsQuery;
            if (data.loading) {
                return <option disabled>Loading authors...</option>
            } else {
                return data.authors.map(author => (
                    <option style={{color: '#966c51'}} key={author.id} value={author.id}>{author.name}</option>
                ));
            }
        };

        return (
            <React.Fragment>
                <form id='add-book'>
                    <div className='field'>
                        <label>Book Name: </label>
                        <input value={this.state.bookName} placeholder='Name' type="text" onChange={this.inputChangeHandler.bind(this, 'bookName')}/>
                    </div>

                    <div className='field'>
                        <label>Genre: </label>
                        <input value={this.state.genre} placeholder='Genre' type="text" onChange={this.inputChangeHandler.bind(this, 'genre')}/>
                    </div>

                    <div className='field'>
                        <label>Author: </label>
                        <select value={this.state.authorId} onChange={this.inputChangeHandler.bind(this, 'authorId')}>
                            <option>Select an author</option>
                            {getAuthors()}
                        </select>
                    </div>

                    <button type='button' onClick={this.onFormSubmitHandler}>✓</button>

                </form>
            </React.Fragment>
        );
    }
}


export default compose(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);
