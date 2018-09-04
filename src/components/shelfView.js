import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ShelfViewItem from './shelfViewItem';
import { getBookId, getBook } from '../actions/searchBookActions';
import { history } from '../routes/appRouter';

export class ShelfView extends React.Component {
    getBookClick = async (id) => {
        this.props.getBookId(id);
        // History like this just for development !! ////
        history.push('/');
        const key ='x0DZfeuqgRLfSZkXTwBv5Q';
        const proxy = 'https://cors-anywhere.herokuapp.com/';

        const response = await  axios(`${proxy}https://www.goodreads.com/book/show/${id}.xml?key=${key}`);

        const parser =  new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        console.log(xmlDoc);
        const book = {
            id: xmlDoc.getElementsByTagName("id")[0].innerHTML,
            author: xmlDoc.getElementsByTagName("name")[0].innerHTML,
            title: xmlDoc.getElementsByTagName("title")[0].innerHTML,
            rating: xmlDoc.getElementsByTagName("average_rating")[0].innerHTML,
            image_url: xmlDoc.getElementsByTagName("image_url")[0].innerHTML,
            description: xmlDoc.getElementsByTagName("description")[0].innerHTML
        };
        book.description = book.description.substring(9, book.description.length - 3);
        this.props.getBook(book);
    };
    render () {
        return (
            <div>
                <h2>Current Shelf: {this.props.currentShelf.name}</h2>
                <ul>
                    {
                        this.props.currentShelf.books.map((book) => <ShelfViewItem getBookClick={this.getBookClick} key={book.id} {...book}/>)
                    }
                </ul>
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    currentShelf: state.shelfs.find((shelf) => shelf.id === props.match.params.id) 
});

const mapDispatchToProps = (dispatch) => ({
    getBookId: (bookId) => dispatch(getBookId(bookId)),
    getBook: (book) => dispatch(getBook(book))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShelfView);