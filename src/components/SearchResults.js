import React from 'react';
import { connect } from 'react-redux';

export const SearchResults = (props) => (
    <ol>
        {
            !!props.searchValue && !props.searchResults.length
                ? <h3> Loading ... </h3>
                : props.searchResults.map((book) => <li key={book.id}><p>Title: {book.title}</p></li> )
        }
    </ol>
);

const mapStateToProps = (state) => ({
    searchValue: state.searchBook.searchValue,
    searchResults: state.searchBook.results
});

export default connect(mapStateToProps)(SearchResults);