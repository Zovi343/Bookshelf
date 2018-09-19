import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/authActions';


export const Header = (props) => (
    <header className="header">
        <Link className="heading" to="/home"><h1 >Bookshelf</h1></Link>
        <button className="logout" onClick={props.startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
