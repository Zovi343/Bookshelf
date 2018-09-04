
export const setSearchValue = (value) => ({
    type: 'SET_SEARCH_VALUE',
    value
});

export const setSearchValueBefore = (value) => ({
    type: 'SET_SEARCH_VALUE_BEFORE',
    value
});

export const setSearchResult = (results) => ({
    type: 'SET_SEARCH_RESULT',
    results
});

export const getBookId = (bookId) => ({
    type: 'GET_BOOK_ID',
    bookId
});

export const getBook = (book) => ({
    type: 'GET_BOOK',
    book
});