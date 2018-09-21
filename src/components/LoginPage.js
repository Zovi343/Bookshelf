import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/authActions';

export class LoginPage extends React.Component {
    render () {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title" >Bookshelf</h1>
                    <p className="box-layout__text">Place where you can manage your reading lists.</p>
                    <button onClick={this.props.startLogin} className="btn"> Login with Google </button>
                </div>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);