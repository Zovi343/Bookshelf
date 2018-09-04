import React from 'react';
import { connect } from 'react-redux';

export class ShelfView extends React.Component {
    render () {
        return (
            <div>
                <h2>Current Shelf: {this.props.currentShelf.name}</h2>
                <ul>
                    {
                        this.props.currentShelf.books.map((book) => <p>{ book.title }</p>)
                    }
                </ul>
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    currentShelf: state.shelfs.find((shelf) => shelf.id === props.match.params.id) 
});

export default connect(mapStateToProps)(ShelfView);