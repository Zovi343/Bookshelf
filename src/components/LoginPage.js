import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/authActions';

export class LoginPage extends React.Component {
    render () {
        return (
            <div>
                <button onClick={this.props.startLogin}>Login</button>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);