import React from 'react';
import { connect } from 'react-redux';
import randomWords from 'random-words';
import { Link } from 'react-router-dom';
import { MdSearch } from "react-icons/md";

import { startSearch, apiErr } from '../actions/searchBookActions';

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
    onSubmit = (e) => {
        e.preventDefault();
        if (!!this.state.search) {
            this.props.startSearch(this.state.search);
            this.setState(() => ({
                search: ''
            }));
        };
    };
    random = () => {
        const randomSearch = randomWords();
        this.props.startSearch(randomSearch);
    };
    render () {
        return (
            <div className="search-area">
                <div className="div-to-center">&nbsp;</div>
                <div className="search-area__search-field">
                    <button className="btn" onClick={this.random}>Random Books</button>
                    <form className="search-form" onSubmit={this.onSubmit}>
                        <input onChange={this.onSearchChange} type="text" placeholder="Search Book By Name or Author" value={this.state.search} />
                        <button disabled={ !!this.state.search ? false : true }><MdSearch /></button>
                    </form>
                </div>
                <Link className="btn" to="/create">Create Shelf</Link>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSearch: (searchValue) => dispatch(startSearch(searchValue)),
    apiErr: () => dispatch(apiErr())
});

export default connect(undefined, mapDispatchToProps)(SearchArea);