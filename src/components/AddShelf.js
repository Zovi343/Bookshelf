import React from 'react';
import { connect } from 'react-redux';

import { startCreateShelf } from '../actions/shelfActions';
import ShelfForm from './ShelfForm';

export class AddShelf extends React.Component {
    newShelf = (shelf) => {
        this.props.startCreateShelf(shelf);
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
    startCreateShelf: (shelf) => dispatch(startCreateShelf(shelf))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShelf);