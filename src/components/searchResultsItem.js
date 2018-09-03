import React from 'react';

export class SearchResultItem extends React.Component {
    onClick = () => {
        this.props.getBookClick(this.props.book);
    };
    render () {
        return (
            <li>
                <button onClick={this.onClick}>
                    <p>Title: {this.props.book.title}</p>
                    <p> Author: {this.props.book.author}</p> 
                    <img src={this.props.book.image_url} alt="Book_Image"/>
                </button>
            </li>
        );
    };
};

export default SearchResultItem;