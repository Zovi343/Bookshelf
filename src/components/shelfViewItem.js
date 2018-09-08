import React from 'react';
import { MdHighlightOff } from "react-icons/md";

export class ShelfViewItem extends React.Component {
    onClickDelete = () => {
        this.props.deleteBook(this.props.id);
    };
    onClickTitle = () => {
        this.props.getBookClick(this.props.id);
    };
    render () {
        return (
            <li>
                <button onClick={this.onClickTitle}>
                    <p>{this.props.title} by {this.props.author}</p>
                </button>
                <button onClick={this.onClickDelete}><MdHighlightOff /></button>
            </li>
        );
    };
};

export default ShelfViewItem;