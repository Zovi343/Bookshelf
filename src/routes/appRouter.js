import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Header from '../components/Header';
import SearchArea from '../components/SearchArea';
import SearchResults from '../components/SearchResults';
import BookView from '../components/BookView';
import CreateShelf from '../components/CreateShelf';
import ShelfList from '../components/shelfList';
 
export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <SearchArea />
            <SearchResults />
            
            <Switch>
                <Route path="/" component={BookView} exact={true} />
                <Route path="/create" component={CreateShelf} />
            </Switch>

            <ShelfList />
        </div>
    </ Router>
);

export default AppRouter;

