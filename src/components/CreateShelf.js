import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { createShelf } from '../actions/shelfActions';

export class CreateShelf extends React.Component {
    state = {
        name: ''
    }
    onChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({
            name
        }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.createShelf({
        name: this.state.name,
        id: uuid,
        books: []        
        });
        this.setState(() => ({
            name: ''
        }));
    };
    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onChange} type="text" placeholder="Name of the shelf" value={this.state.name}/>
                <input type="submit" value="Create Shelf!"/>
            </form>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    createShelf: (shelf) => dispatch(createShelf(shelf))
});


export default connect(undefined, mapDispatchToProps)(CreateShelf);