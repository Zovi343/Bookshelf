import React from 'react';

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
        if (!this.state.name) {
            this.setState(() => ({
                error: 'You need to provide name for your shelf.'
            }));
        } else if(!!this.props.takenNames.find((name) => name.toLowerCase() === this.state.name.toLowerCase())) {
            this.setState(() => ({
                error: 'This name is already in use!'
            }));
        } else {
            this.props.newShelf({
            name: this.state.name,
            books: []        
            });
            this.setState(() => ({
                name: ''
            }));
        };
    };
    render () {
        return (
            <div>
                <form className="shelf-form" onSubmit={this.onSubmit}>
                    <input onChange={this.onChange} type="text" placeholder="Name of the shelf" value={this.state.name}/>
                    <div className="shelf-form__last-group">
                        <input className="btn" type="submit" value="Save Shelf!"/>
                        { !!this.state.error && <p>{ this.state.error }</p> }
                    </div>
                </form>
            </div>
        );
    };
};

export default CreateShelf;
