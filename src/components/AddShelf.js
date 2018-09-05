import React from 'react';
import { connect } from 'react-redux';

import { createShelf } from '../actions/shelfActions';
import ShelfForm from './ShelfForm';

export class AddShelf extends React.Component {
    newShelf = (shelf) => {
        this.props.createShelf(shelf);
    }
    render () {
        return (
            <div>
                <ShelfForm newShelf={this.newShelf} takenNames={this.props.shelfsNames} />
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    shelfsNames: state.shelfs.map((shelf) => shelf.name)
});

const mapDispatchToProps = (dispatch) => ({
    createShelf: (shelf) => dispatch(createShelf(shelf))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShelf);