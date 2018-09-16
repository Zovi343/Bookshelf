import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/authActions';


export const Header = (props) => (
    <header className="header">
        <h1 className="heading">Bookshelf</h1>
        <button className="logout" onClick={props.startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
