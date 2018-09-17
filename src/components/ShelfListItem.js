import React from 'react';

class ShelfListItem extends React.Component {
    onClick = () => {   
        this.props.history.push(`/shelf/${this.props.id}`);
    };
    render () {
        return (
            <li className="shelf-list-item">
                <button onClick={this.onClick}>
                    {this.props.name}
                </button>
            </li>
        );
    };
};

export default ShelfListItem;