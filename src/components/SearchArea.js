import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onSearchChange} type="text" placeholder="Search" value={this.state.search} />
                    <button disabled={ !!this.state.search ? false : true }><MdSearch /></button>
                </form>
                <Link to="/create">Create Shelf</Link>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSearch: (searchValue) => dispatch(startSearch(searchValue)),
    apiErr: () => dispatch(apiErr())
});

export default connect(undefined, mapDispatchToProps)(SearchArea);