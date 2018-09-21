import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SearchArea from '../components/SearchArea';
import SearchResults from '../components/SearchResults';
import ShelfList from '../components/ShelfList'

export const PrivateRoute = ({
    isAuth, 
    component: Component,
    ...rest

}) => (
    <Route {...rest} component={(props) => (
        isAuth ? (
            <div className="width-error">
                <h2 className="width-error__item">We are sorry, but this webpage is not available on your screen width.</h2>
                <div className="main">
                    <Header />
                    <SearchArea />
                    <div className="content">
                        <SearchResults {...props}/>
                        <Component {...props}/>
                        <ShelfList {...props}/>
                    </div>
                </div>
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuth: !!state.auth.uid
}); 

export default connect(mapStateToProps)(PrivateRoute);