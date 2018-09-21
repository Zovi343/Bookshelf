import database from '../firebase/firebase';

export const startSetShelfs = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/shelfs`).once('value').then((snapshot) => {
            let shelfs = [];
            snapshot.forEach((childSnapshot) => {
                let newShelf = childSnapshot.val();
                newShelf.id = childSnapshot.key;
                if(!!newShelf.books){
                    let newBooks = []; // there is "s" ! at the end !!!
                    let booksKeys = [];
                    Object.keys(newShelf.books).forEach((key) => {
                        booksKeys.push(key);
                    });
                    booksKeys.forEach((bookKey) => {
                        let newBook = newShelf.books[bookKey]; // there is no "s" at the end here !!!
                        newBook.time = bookKey;
                        newBooks.push(newBook);
                    });
                    newShelf.books = newBooks;
                } else {
                    newShelf.books = [];
                };
                shelfs.push(newShelf);
            });

            dispatch(setShelfs(shelfs));
        }).catch((e) => console.log('Error In startSetShelfs', e));
    };
};

export const startCreateShelf = (shelf) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/shelfs`).push(shelf).then((ref) => {
            shelf.id = ref.key;
            dispatch(createShelf(shelf));

        }).catch((e) => console.log('Error In startCreateShelfs', e));
    };
};

export const startDeleteShelf = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/shelfs/${id}`).remove().then(() => {
            dispatch(deleteShelf(id));
        }).catch((e) => console.log('Error In startDeleteShelf', e));
    };
};

export const startEditShelf = (id, name) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        database.ref(`users/${uid}/shelfs/${id}`).update({ name }).then(() => {
            dispatch(editShelf(id, name));
        }).catch((e) => console.log('Error In startEditShelfs', e));
    };
};

export const startAddBook = (id, book) => {
    return async (dispatch, getState) => {
        
        const uid = getState().auth.uid;
        database.ref(`users/${uid}/shelfs/${id}/books/${book.time}`).set({ title: book.title, author: book.author, publication_year: book.publication_year, id: book.id}).then(() => {
            dispatch(addBook(id, book));
        }).catch((e) => console.log('Error In startAddBook', e));
    };
};

export const startRemoveBook = (shelfId, bookTime) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        database.ref(`users/${uid}/shelfs/${shelfId}/books/${bookTime}`).remove().then(() => {
            dispatch(removeBook(shelfId, bookTime));
        }).catch((e) => console.log('Error In startRemoveBook', e));
    };
};

export const setShelfs = (shelfs) => ({
    type: 'SET_SHELFS',
    shelfs
});

export const createShelf = (shelf) => ({
    type: 'CREATE_SHELF',
    shelf
});

export const deleteShelf = (id) => ({
    type: 'DELETE_SHELF',
    id
});

export const editShelf = (id, name) => ({
    type: 'EDIT_SHELF',
    id,
    name
});

export const addBook = (id, book) => ({
    type: 'ADD_BOOK',
    id,
    book
});

export const removeBook = (shelfId, bookTime) => ({
    type: 'REMOVE_BOOK',
    shelfId,
    bookTime
});