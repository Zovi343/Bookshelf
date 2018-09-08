import React from 'react';
import { connect } from 'react-redux';
import { MdSettings } from "react-icons/md";

import ShelfViewItem from './ShelfViewItem';
import {  startGetBook } from '../actions/searchBookActions';
import {  startRemoveBook } from '../actions/shelfActions';

export class ShelfView extends React.Component {
    state = {
        search: ''
    }
    deleteBook = (bookId) => {
        this.props.startRemoveBook(this.props.currentShelf.id, bookId);
    };
    getBookClick = (id) => {
        this.props.startGetBook(id);
        this.props.history.push('/home');
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
    startGetBook: (id) => dispatch(startGetBook(id)),
    startRemoveBook: (shelfId, bookId) => dispatch(startRemoveBook(shelfId, bookId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShelfView);