import React from "react";
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const addBook = props => {

    const getAuthors = () => {
        const data = props.data;
        if(data.loading) {
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
};

export default graphql(getAuthorsQuery)(addBook);
