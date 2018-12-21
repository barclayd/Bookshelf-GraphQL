import React, {Component} from "react";
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../../queries/queries';

class AddBook extends Component {

    render() {
        const getAuthors = () => {
            const data = this.props.data;
            if (data.loading) {
                return <option disabled>Loading authors...</option>
            } else {
                return data.authors.map(author => (
                    <option key={author.id} value={author.id}>{author.name}</option>
                ));
            }
        };

        return (
            <React.Fragment>
                <form id='add-book'>
                    <div className='field'>
                        <label>Book Name: </label>
                        <input type="text"/>
                    </div>

                    <div className='field'>
                        <label>Genre: </label>
                        <input type="text"/>
                    </div>

                    <div className='field'>
                        <label>Author: </label>
                        <select defaultValue='select author'>
                            <option>Select author</option>
                            {getAuthors()}
                        </select>
                    </div>

                    <button>+</button>

                </form>
            </React.Fragment>
        );
    }
}


export default graphql(getAuthorsQuery)(AddBook);
