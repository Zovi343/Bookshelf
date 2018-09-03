import React from 'react';
import { connect } from 'react-redux';


export class BookView extends React.Component {
    descriptionText = () => {
        return { __html:`${this.props.book.description}` };
    }
    render () {
        return (
            !!this.props.bookId && !this.props.book
                ? <h3> Loading ... </h3>
                :<div>
                    <h2>{ this.props.book && this.props.book.title }</h2>
                    { this.props.book && <p>Author: { this.props.book.author}</p>}
                    { this.props.book && <img src={this.props.book.image_url} alt="Book-Cover"/> }
                    { this.props.book &&  <p>rating: { this.props.book.rating}</p> }
                    { this.props.book && <p> Description </p> }
                    <p dangerouslySetInnerHTML={ this.props.book && this.descriptionText() }></p>
                </div>
        );
    };
};

const mapStateToProps = (state) => ({
    bookId: state.searchBook.currentBookId,
    book: state.searchBook.currentBook
});

export default connect(mapStateToProps)(BookView);