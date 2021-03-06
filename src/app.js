import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/main.scss';
import { firebase } from './firebase/firebase';

import AppRouter, { history } from './routes/appRouter';
import { startSetShelfs } from './actions/shelfActions';
import { login, logout } from './actions/authActions';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    };
};

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetShelfs()).then(() =>{
            renderApp();
            if(history.location.pathname === '/') {
                history.push('/home')
            };
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    };         
});