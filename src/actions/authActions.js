import { firebase, googleAuthProvider } from '../firebase/firebase';
import { unsetSearchResult, unsetBookId, unsetBook, unsetSearchValue, unsetSearchValueBefore } from './searchBookActions';


export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const startLogout = () => {
    return (dispatch) => {
        return firebase.auth().signOut().then(() =>{
            dispatch(unsetSearchResult());
            dispatch(unsetBookId());
            dispatch(unsetBook());
            dispatch(unsetSearchValue());
            dispatch(unsetSearchValueBefore());
        });
    };
};

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const logout = () => ({
    type: 'LOGOUT'
});