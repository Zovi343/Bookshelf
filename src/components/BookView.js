import React from 'react';
import { connect } from 'react-redux';

import { addBook } from '../actions/shelfActions';


export class BookView extends React.Component {
    state = {
        currentShelf: null
    };
    onChange = (e) => {
        const currentShelf = e.target.value;
        this.setState(() => ({
            currentShelf
        }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        const savedBook = {
            id: this.props.book.id, 
            title: this.props.book.title, 
            author: this.props.book.author
        };
        this.props.addBook(this.state.currentShelf, savedBook);
    };
    descriptionText = () => {
        return { __html:`${this.props.book.description}` };
    };
    render () {
        return (
            !!this.props.bookId && !this.props.book
                ? <h3> Loading ... </h3>
                : this.props.book
                    ? <div>
                        <h2>{ this.props.book.title }</h2>
                        { <p>Author: { this.props.book.author}</p>}
                        { <img src={this.props.book.image_url} alt="Book-Cover"/> }
                        { <p>rating: { this.props.book.rating}</p> }
                        { <p> Description </p> }
                        <p dangerouslySetInnerHTML={ this.descriptionText() }></p>

                        <form onSubmit={this.onSubmit}>
                            <select onChange={this.onChange}>
                            <option></option>
                            { this.props.shelfs.map((shelf) => <option key={shelf.id}>{ shelf.name }</option>) }
                            </select>
                            <input type="submit" value="Add"/>
                        </form>
                     </div>
                    : <div></div>
        );
    };
};

const mapStateToProps = (state) => ({
    bookId: state.searchBook.currentBookId,
    book: state.searchBook.currentBook,
    shelfs: state.shelfs
});

const mapDispatchToProps = (dispatch) => ({
    addBook: (shelf, book) => dispatch(addBook(shelf, book))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookView);