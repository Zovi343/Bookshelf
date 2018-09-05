import React from 'react';
import { connect } from 'react-redux';

import ShelfForm from './ShelfForm';
import { deleteShelf, editShelf } from '../actions/shelfActions';

export class EditShelf extends React.Component {
    clickDelete = () => {
        this.props.deleteShelf(this.props.currentShelf.id);
        this.props.history.push('/');
    };
    submitEdit = (shelf) => {
        this.props.editShelf(this.props.currentShelf.id, shelf.name);
        this.props.history.push(`/shelf/${this.props.currentShelf.id}`);
    };
    render () {
        return (
            <div>
                <ShelfForm shelfName={this.props.currentShelf.name} newShelf={this.submitEdit} takenNames={this.props.shelfsNames} />
                <button onClick={this.clickDelete}>Delete</button>
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    shelfsNames: state.shelfs.map((shelf) => shelf.name),
    currentShelf: state.shelfs.find((shelf) => shelf.id === props.match.params.id) 
});

const mapDispatchToProps = (dispatch) => ({
    deleteShelf: (id) => dispatch(deleteShelf(id)),
    editShelf: (id, name) => dispatch(editShelf(id, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditShelf);
