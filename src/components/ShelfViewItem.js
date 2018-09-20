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
            <li className="shelf-view-item">
                <button className="shelf-view-item__title" onClick={this.onClickTitle}>
                    <p>{this.props.title}</p>
                    <p>{this.props.author}</p>
                    <p>{this.props.publication_year}</p>
                </button>
                <button className="shelf-view-item__delete" onClick={this.onClickDelete}><MdHighlightOff /></button>
            </li>
        );
    };
};

export default ShelfViewItem;