import React from 'react';
import { connect } from 'react-redux';
import { MdAddCircle } from "react-icons/md";

import { startAddBook } from '../actions/shelfActions';



export class BookView extends React.Component {
    state = {
        currentShelf: 'Select Shelf'
    };
    onChange = (e) => {
        const currentShelf = e.target.value;
        this.setState(() => ({
            currentShelf
        }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.currentShelf !== 'Select Shelf'){
            let id = this.props.shelfs.find((shelf) => shelf.name === this.state.currentShelf).id;
            const savedBook = {
                id: this.props.book.id, 
                title: this.props.book.title, 
                author: this.props.book.author
            };
            this.props.startAddBook(id, savedBook);
            return "false";
        } else {
            return "true";
        }
    };
    descriptionText = () => {
        return { __html:`${this.props.book.description}`};
    };
    ratingColor = () => {
        if (this.props.book.rating >= 4){
            return "top-rating"
        } else if (this.props.book.rating >= 3) {
            return "good-rating"
        } else if (this.props.book.rating >= 2) {
            return "average-rating"
        } else {
            return "bad-rating"
        }
    };
    addAllowed = () => {
        if(this.state.currentShelf === 'Select Shelf') {
            return true;
        } else {
            return false;
        }
    };
    render () {
        return (
            (!!this.props.bookId && !this.props.book.id) || (this.props.bookId !== this.props.book.id && !!this.props.book.id)
                ? <div className="book-view"> <h3> Loading ... </h3> </div>
                : this.props.book.id
                    ? <div className="book-view">
                        <div className="book-image">
                            <img className="book-image__item image" src={this.props.book.image_url} alt="Book-Cover"/>
                            <p className="book-image__item" >Rating: <span className={this.ratingColor()}> { this.props.book.rating} </span></p>
                            <p className="book-image__item" >Published: { this.props.book.publication_year || 'No Data'}</p>
                        </div>
                        <div className="book-description">
                            <div className="title-select-part">
                                <div className="title-author">
                                    <h2>{ this.props.book.title }</h2>
                                    <p className="author-name">by { this.props.book.author}</p>
                                </div>
                                <form onSubmit={this.onSubmit}>
                                    <label htmlFor="shelfs"> Add to shelf:</label>
                                        <select onChange={this.onChange} name="shelfs" id="shelfs">
                                        <option>Select Shelf</option>
                                        { 
                                            this.props.shelfs.filter((shelf) => !shelf.books.find((book) => book.id === this.props.book.id))
                                            .map((shelf) => <option key={shelf.id}>{ shelf.name }</option>)
                                        }
                                        </select>
                                    <button className="add-to-shelf" disabled={this.addAllowed()}><MdAddCircle className="add-to-shelf__icon" /></button>
                                </form>
                            </div>
                            <p dangerouslySetInnerHTML={ this.descriptionText() }></p>
                        </div>

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

