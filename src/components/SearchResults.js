import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SearchResultItem from './searchResultsItem';
import { getBookId, getBook } from '../actions/searchBookActions';
import { history } from '../routes/appRouter'; // <-- this is just for development 


export class SearchResults extends React.Component {
    getBookClick = async (book) => {
        this.props.getBookId(book.id);

        history.push('/');
        const key ='x0DZfeuqgRLfSZkXTwBv5Q';
        const proxy = 'https://cors-anywhere.herokuapp.com/';

        const response = await  axios(`${proxy}https://www.goodreads.com/book/show/${book.id}.xml?key=${key}`);

        const parser =  new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        console.log(xmlDoc);

        let description = xmlDoc.getElementsByTagName("description")[0].innerHTML;
        description = description.substring(9, description.length - 3);
        
        console.log(typeof(description));
        book = Object.assign(book, { description})
        this.props.getBook(book);
    };
    render () {
    return (
            <div> 
                <ol>
                    {
                        !!this.props.searchValue && !this.props.searchResults.length
                            ? <h3> Loading ... </h3>
                            : this.props.searchResults.map((book) => <SearchResultItem getBookClick={this.getBookClick} key={book.id} book={book} /> )
                    }
                </ol>
            </div>
        ); 
    };
};

const mapStateToProps = (state) => ({
    searchValue: state.searchBook.searchValue,
    searchResults: state.searchBook.results
});

const mapDispatchToProps = (dispatch) => ({
    getBookId: (bookId) => dispatch(getBookId(bookId)),
    getBook: (book) => dispatch(getBook(book))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);