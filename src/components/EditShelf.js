import React from 'react';
import { connect } from 'react-redux';

import ShelfForm from './ShelfForm';
import { startDeleteShelf, startEditShelf } from '../actions/shelfActions';

export class EditShelf extends React.Component {
    clickDelete = () => {
        this.props.startDeleteShelf(this.props.currentShelf.id);
        this.props.history.push('/home');
    };
    submitEdit = (shelf) => {
        this.props.startEditShelf(this.props.currentShelf.id, shelf.name);
        this.props.history.push(`/shelf/${this.props.currentShelf.id}`);
    };
    render () {
        return (
            <div className="add-edit-shelf">
                <h2>Editing Shelf:&nbsp;{this.props.currentShelf.name}</h2>
                <ShelfForm shelfName={this.props.currentShelf.name} newShelf={this.submitEdit} takenNames={this.props.shelfsNames} />
                <button className="btn btn--white" onClick={this.clickDelete}>Delete</button>
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    shelfsNames: state.shelfs.map((shelf) => shelf.name),
    currentShelf: state.shelfs.find((shelf) => shelf.id === props.match.params.id) 
});

const mapDispatchToProps = (dispatch) => ({
    startDeleteShelf: (id) => dispatch(startDeleteShelf(id)),
    startEditShelf: (id, name) => dispatch(startEditShelf(id, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditShelf);
