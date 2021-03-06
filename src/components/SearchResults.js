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
                        ? <p  className="api-error">{this.props.apiErrText}</p>
                        : !this.props.searchValue
                            ? <div className="message">
                                <h3 className="message__item">Search for something!</h3>
                              </div>
                            : this.props.searchValue !== this.props.searchValueBefore
                                ? <div className="loader"> 
                                    <img className="loader__image" src="/images/loader.gif" />
                                    </div>
                                : !!this.props.searchResults.map((book) => book).length
                                    ?<ol> 
                                        { this.props.searchResults.map((book) => <SearchResultItem getBookClick={this.getBookClick} key={book.id} book={book} />) } 
                                    </ol> 
                                    :<div className="no-results">
                                        <h2 className="no-results__item">No Results</h2>
                                    </div>
                                 
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