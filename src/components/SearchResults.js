import React from 'react';
import { connect } from 'react-redux';

import SearchResultItem from './SearchResultsItem';
import { startGetBook } from '../actions/searchBookActions';


export class SearchResults extends React.Component {
    getBookClick = (id) => {
        this.props.startGetBook(id);
        this.props.history.push('/home');
    };
    render () {
    return (
            <div className="search-results"> 
                {
                    !!this.props.apiErrText
                        ? <p>{this.props.apiErrText}</p>
                        : <ol>
                            {
                                this.props.searchValue !== this.props.searchValueBefore
                                    ? <h3> Loading ... </h3>
                                    : this.props.searchResults.map((book) => <SearchResultItem getBookClick={this.getBookClick} key={book.id} book={book} /> )
                            }
                         </ol>
                }
            </div>
        ); 
    };
};

const mapStateToProps = (state) => ({
    searchValue: state.searchBook.searchValue,
    searchValueBefore: state.searchBook.searchValueBefore,
    apiErrText: state.searchBook.apiErr,
    searchResults: state.searchBook.results
});

const mapDispatchToProps = (dispatch) => ({
    startGetBook: (id) => dispatch(startGetBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);