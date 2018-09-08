import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isNotAuth, 
    component: Component,
    ...rest

}) => (
    <Route {...rest} component={(props) => (
        isNotAuth ? (
            <div>
                <Component {...props}/>
            </div>
        ) : (
            <Redirect to="/home" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isNotAuth: !state.auth.uid
}); 

export default connect(mapStateToProps)(PublicRoute);