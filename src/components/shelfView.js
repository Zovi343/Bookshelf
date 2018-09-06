import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { MdSettings } from "react-icons/md";

import ShelfViewItem from './shelfViewItem';
import { getBookId, getBook, apiErr } from '../actions/searchBookActions';
import { removeBook} from '../actions/shelfActions';
import { history } from '../routes/appRouter';

export class ShelfView extends React.Component {
    state = {
        search: ''
    }
    deleteBook = (id) => {
        this.props.removeBook(this.props.currentShelf.name, id)
    }
    getBookClick = async (id) => {
        try {
            this.props.getBookId(id);
            // History like this is just for development !! ////
            history.push('/');
            const key ='x0DZfeuqgRLfSZkXTwBv5Q';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
    
            const response = await  axios(`${proxy}https://www.goodreads.com/book/show/${id}.xml?key=${key}`);
    
            const parser =  new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "text/xml");
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
        } catch (e) {
            console.log('-----Error In ShelfView', e);
            this.props.apiErr();
        }
    };
    editShelf = () => {
        this.props.history.push(`/edit/${this.props.currentShelf.id}`);
    };
    onSearchChange = (e) => {
        const search = e.target.value;
        this.setState(() => ({
            search
        }));
    };
    render () {
        return (
            <div>
                {
                    !!this.props.currentShelf
                        ?(
                            <div>
                                <h2>Current Shelf: {this.props.currentShelf.name}</h2>
                                <form>
                                    <input onChange={this.onSearchChange} type="text" placeholder="Search within shelf" value={this.state.search}/>
                                </form>
                                <button onClick={this.editShelf}><MdSettings /></button>
                                <ul>
                                    {
                                        !!this.state.search
                                            ? this.props.currentShelf.books.map((book) => {
                                                if (`${book.title} ${book.author}`.includes(this.state.search)){
                                                    return ( <ShelfViewItem 
                                                            deleteBook={this.deleteBook}
                                                            getBookClick={this.getBookClick} 
                                                            key={book.id} 
                                                            {...book}
                                                            />
                                                        )
                                                } else { return null }
                                            })
                                            : this.props.currentShelf.books.map((book) =>  <ShelfViewItem 
                                                                                                deleteBook={this.deleteBook}
                                                                                                getBookClick={this.getBookClick} 
                                                                                                key={book.id} 
                                                                                                {...book}
                                                                                            />)
                                    }
                                </ul>
                            </div>
                        )
                        :(
                            <p>You don't have any shelf with this id.</p>
                        )
                }
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    currentShelf: state.shelfs.find((shelf) => shelf.id === props.match.params.id),
    apiErrText: state.searchBook.apiErr
});

const mapDispatchToProps = (dispatch) => ({
    getBookId: (bookId) => dispatch(getBookId(bookId)),
    getBook: (book) => dispatch(getBook(book)),
    removeBook: (shelf, id) => dispatch(removeBook(shelf, id)),
    apiErr: () => dispatch(apiErr())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShelfView);