import database from '../firebase/firebase';

export const startSetShelfs = () => {
    return (dispatch) => {

        return database.ref(`shelfs`).once('value').then((snapshot) => {
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
                        newBook.id = bookKey;
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
    return async (dispatch) => {

        return database.ref(`shelfs`).push(shelf).then((ref) => {
            shelf.id = ref.key;
            dispatch(createShelf(shelf));

        }).catch((e) => console.log('Error In startCreateShelfs', e));
    };
};

export const startDeleteShelf = (id) => {
    return async (dispatch) => {

        return database.ref(`shelfs/${id}`).remove().then(() => {
            dispatch(deleteShelf(id));
        }).catch((e) => console.log('Error In startDeleteShelf', e));
    };
};

export const startEditShelf = (id, name) => {
    return async (dispatch) => {

        database.ref(`shelfs/${id}`).update({ name }).then(() => {
            dispatch(editShelf(id, name));
        }).catch((e) => console.log('Error In startEditShelfs', e));
    };
};

export const startAddBook = (id, book) => {
    return async (dispatch) => {

        database.ref(`shelfs/${id}/books/${book.id}`).set({ title: book.title, author: book.author}).then(() => {
            dispatch(addBook(id, book));
        }).catch((e) => console.log('Error In startAddBook', e));
    };
};

export const startRemoveBook = (shelfId, bookId) => {
    return async (dispatch) => {

        database.ref(`shelfs/${shelfId}/books/${bookId}`).remove().then(() => {
            dispatch(removeBook(shelfId, bookId));
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

export const removeBook = (shelfId, bookId) => ({
    type: 'REMOVE_BOOK',
    shelfId,
    bookId
});