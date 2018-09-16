import React from 'react';
import { connect } from 'react-redux';
import { MdAddCircleOutline } from "react-icons/md";

import { startAddBook } from '../actions/shelfActions';



export class BookView extends React.Component {
    state = {
        currentShelf: ''
    };
    onChange = (e) => {
        const currentShelf = e.target.value;
        this.setState(() => ({
            currentShelf
        }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!!this.state.currentShelf){
            let id = this.props.shelfs.find((shelf) => shelf.name === this.state.currentShelf).id;
            const savedBook = {
                id: this.props.book.id, 
                title: this.props.book.title, 
                author: this.props.book.author
            };
            this.props.startAddBook(id, savedBook);
        };
    };
    descriptionText = () => {
        return { __html:`${this.props.book.description}`};
    };
    render () {
        return (
            (!!this.props.bookId && !this.props.book.id) || (this.props.bookId !== this.props.book.id && !!this.props.book.id)
                ? <div className="book-view"> <h3> Loading ... </h3> </div>
                : this.props.book.id
                    ? <div className="book-view">
                        <h2>{ this.props.book.title }</h2>
                        { <p>Author: { this.props.book.author}</p>}
                        { <img src={this.props.book.image_url} alt="Book-Cover"/> }
                        { <p>rating: { this.props.book.rating}</p> }
                        { <p> Description </p> }
                        <p dangerouslySetInnerHTML={ this.descriptionText() }></p>

                        <form onSubmit={this.onSubmit}>
                            <label htmlFor="shelfs"> Add to shelf</label>
                            <select onChange={this.onChange} name="shelfs" id="shelfs">
                            <option>&nbsp;</option>
                            { 
                                this.props.shelfs.filter((shelf) => !shelf.books.find((book) => book.id === this.props.book.id))
                                .map((shelf) => <option key={shelf.id}>{ shelf.name }</option>)
                            }
                            </select>
                            <button><MdAddCircleOutline /></button>
                        </form>
                     </div>
                    : <div className="book-view"></div>
        );
    };
};

const mapStateToProps = (state) => ({
    bookId: state.searchBook.currentBookId,
    book: state.searchBook.currentBook,
    shelfs: state.shelfs
});

const mapDispatchToProps = (dispatch) => ({
    startAddBook: (shelf, book) => dispatch(startAddBook(shelf, book))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookView);

