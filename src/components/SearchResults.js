import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SearchResultItem from './searchResultsItem';
import { getBookId, getBook, apiErr } from '../actions/searchBookActions';
import { history } from '../routes/appRouter'; // <-- this is just for development 


export class SearchResults extends React.Component {
    getBookClick = async (book) => {
        try {
            this.props.getBookId(book.id);
    
            // History like this just for development !! ////
            history.push('/');
            const key ='x0DZfeuqgRLfSZkXTwBv5Q';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
    
            const response = await  axios(`${proxy}https://www.goodreads.com/book/show/${book.id}.xml?key=${key}`);
    
            const parser =  new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "text/xml");
    
            let description = xmlDoc.getElementsByTagName("description")[0].innerHTML;
            // This removes CDATA
            description = description.substring(9, description.length - 3);
            
            book = Object.assign(book, { description})
            this.props.getBook(book);
        } catch (e) {
            console.log('----Error In SearchResult', e);
            this.props.apiErr();
        }
    };
    render () {
    return (
            <div> 
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
    getBookId: (bookId) => dispatch(getBookId(bookId)),
    getBook: (book) => dispatch(getBook(book)),
    apiErr: () => dispatch(apiErr())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);