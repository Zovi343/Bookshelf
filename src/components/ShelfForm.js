import React from 'react';
import uuid from 'uuid';

export class CreateShelf extends React.Component {
    state = {
        name: this.props.shelfName || '',
        error: ''
    }
    onChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({
            name
        }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(!!this.props.takenNames.find((name) => name.toLowerCase() === this.state.name.toLowerCase())) {
            this.setState(() => ({
                error: 'This name is already in use!'
            }));
        } else {
            this.props.newShelf({
            name: this.state.name,
            id: uuid(),
            books: []        
            });
            this.setState(() => ({
                name: ''
            }));
        }
    };
    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange} type="text" placeholder="Name of the shelf" value={this.state.name}/>
                    <input type="submit" value="Save Shelf!"/>
                </form>
                { !!this.state.error && <p>{ this.state.error }</p> }
            </div>
        );
    };
};

export default CreateShelf;
