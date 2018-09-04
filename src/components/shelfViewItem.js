import React from 'react';

export class ShelfViewItem extends React.Component {
    onClickTitle = () => {
        this.props.getBookClick(this.props.id);
    }
    render () {
        return (
            <li>
                <button onClick={this.onClickTitle}>
                    <p>{this.props.title} by {this.props.author}</p>
                </button>
            </li>
        );
    };
};

export default ShelfViewItem;