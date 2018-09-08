import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import AddShelf from '../components/AddShelf';
import BookView from '../components/BookView';
import EditShelf from '../components/EditShelf';
import LoginPage from '../components/LoginPage';
import ShelfView from '../components/ShelfView';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/home" component={BookView} />
                <PrivateRoute path="/shelf/:id" component={ShelfView} />
                <PrivateRoute path="/create" component={AddShelf} />
                <PrivateRoute path="/edit/:id" component={EditShelf} />
            </Switch>
        </div>
    </ Router>
);

export default AppRouter;

