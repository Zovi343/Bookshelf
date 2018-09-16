import axios from 'axios';

export const startSearch = (searchValue) => {
    return async (dispatch) => {
        try {
            dispatch(setSearchValue(searchValue));
    
            const key ='x0DZfeuqgRLfSZkXTwBv5Q';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const encodedSearchValue = encodeURIComponent(searchValue);
    
            const response = await axios(`${proxy}https://www.goodreads.com/search.xml?key=${key}&q=${encodedSearchValue}`);
    
            const parser =  new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "text/xml");

            const results = [];
            let lengthOfRes = xmlDoc.getElementsByTagName("work").length;

            if (lengthOfRes > 10) {
                lengthOfRes = 10;
            };
            
            for(let i = 0; i < lengthOfRes ; i++) {
                const obj = {
                    id: xmlDoc.getElementsByTagName("best_book")[i].firstChild.nextSibling.innerHTML,
                    author: xmlDoc.getElementsByTagName("name")[i].innerHTML,
                    title: xmlDoc.getElementsByTagName("title")[i].innerHTML,
                    rating: xmlDoc.getElementsByTagName("average_rating")[i].innerHTML,
                    image_url: xmlDoc.getElementsByTagName("image_url")[i].innerHTML
                };
                results.push(obj);
            };

            dispatch(setSearchResult(results));
            dispatch(setSearchValueBefore(searchValue));

        } catch(e) {
            console.log('----Error in Start Search Error', e);
            dispatch(apiErr());
        };
    };
};

export const startGetBook = (id) => {
    return async (dispatch) => {
        try {
            dispatch(getBookId(id));

            const key ='x0DZfeuqgRLfSZkXTwBv5Q';
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const response = await  axios(`${proxy}https://www.goodreads.com/book/show/${id}.xml?key=${key}`);

            const parser =  new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "text/xml");

            const book = {
                id: xmlDoc.getElementsByTagName("id")[0].innerHTML,
                author: xmlDoc.getElementsByTagName("name")[0].innerHTML,
                title: xmlDoc.getElementsByTagName("title")[0].innerHTML,
                rating: xmlDoc.getElementsByTagName("average_rating")[0].innerHTML,
                image_url: xmlDoc.getElementsByTagName("image_url")[0].innerHTML,
                description: xmlDoc.getElementsByTagName("description")[0].innerHTML,
                publication_year: xmlDoc.getElementsByTagName("publication_year")[0].innerHTML
            };
            book.description = book.description.substring(9, book.description.length - 3);
            if(book.title.includes('CDATA')){
                book.title = book.title.substring(9, book.title.length - 3);
            };
            console.log(book);
            dispatch(getBook(book));
        } catch (e) {
            console.log('-----Error In startGetBook', e);
            dispatch(apiErr());
        };
    };
};

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

export const unsetSearchResult = () => ({
    type: 'UNSET_SEARCH_RESULT'
});

export const getBookId = (bookId) => ({
    type: 'GET_BOOK_ID',
    bookId
});

export const getBook = (book) => ({
    type: 'GET_BOOK',
    book
});

export const unsetBookId = () => ({
    type: 'UNSET_BOOK_ID'
});

export const unsetBook = () => ({
    type: 'UNSET_BOOK'
});

export const apiErr = () => ({
    type: 'API_ERR'
});