import React from 'react';

export class SearchResultItem extends React.Component {
    onClick = () => {
        this.props.getBookClick(this.props.book.id);
    };
    render () {
        return (
            <li className="result-item">
                <button onClick={this.onClick}>
                    <img src={this.props.book.image_url} alt="Book_Image"/>
                    <div className="result-author">
                        <p>{this.props.book.title}</p>
                        <p> by </p>
                        <p>{this.props.book.author}</p> 
                    </div>
                </button>
            </li>
        );
    };
};

export default SearchResultItem;