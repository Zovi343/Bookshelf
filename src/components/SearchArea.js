import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { setSearchValue, setSearchResult } from '../actions/searchBookActions';

export class SearchArea extends React.Component {
    state = {
        search: ''
    };
    onSearchChange = (e) => {
        const search = e.target.value;
        this.setState(() => ({
            search
        }));
    };
    onSubmit = async (e) => {
        e.preventDefault();
        this.props.setSearchValue(this.state.search);
        this.setState(() => ({
            search: ''
        }));
        if (this.state.search) {
            const key ='x0DZfeuqgRLfSZkXTwBv5Q';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const encodedSearchValue = encodeURIComponent(this.state.search);
    
            const response = await  axios(`${proxy}https://www.goodreads.com/search.xml?key=${key}&q=${encodedSearchValue}`);
    
            const parser =  new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "text/xml");
            let results = [];
            for(let i = 0; i < 10 ; i++) {
                const obj = {
                    id: xmlDoc.getElementsByTagName("best_book")[i].firstChild.nextSibling.innerHTML,
                    author: xmlDoc.getElementsByTagName("name")[i].innerHTML,
                    title: xmlDoc.getElementsByTagName("title")[i].innerHTML,
                    rating: xmlDoc.getElementsByTagName("average_rating")[i].innerHTML,
                    image_url: xmlDoc.getElementsByTagName("image_url")[i].innerHTML
                }
                results.push(obj);
            }

            this.props.setSearchResult(results);

        };
    };
    CreateShelf = () => {
        this.props.history.push('/create');
    }
    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onSearchChange} type="text" placeholder="Search" value={this.state.search} />
                    <input type="submit" value="Submit"/>
                </form>
                <Link to="/create">Create Shelf</Link>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    setSearchResult: (results) => dispatch(setSearchResult(results))
});

export default connect(undefined, mapDispatchToProps)(SearchArea);