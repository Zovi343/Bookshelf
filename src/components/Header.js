import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/authActions';


export const Header = (props) => (
    <header>
        <h1 className="hello">Bookshelf</h1>
        <button onClick={props.startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
