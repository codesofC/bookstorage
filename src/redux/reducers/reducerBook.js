import { v4 as uuidv4 } from 'uuid'
import { ADDBOOK, DELETEBOOK, DELETEALLBOOK } from '../constant'

const initialState = {
    books: []
}
const helperAddData = data => {
    return {
        id: uuidv4(),
        title: data.payload.title,
        author: data.payload.author
    }

}

const reducerBook = (state = initialState.books, action) => {
    
    if(localStorage.getItem('booksData')){
        state = JSON.parse(localStorage.getItem('booksData'))
    }

    switch(action.type){
        case ADDBOOK:
            state = [...state, helperAddData(action)]
            localStorage.setItem('booksData', JSON.stringify(state))
            return state;

        case DELETEBOOK:
            state = [...state].filter(book => book.id !== action.payload);
            localStorage.setItem('booksData', JSON.stringify(state))
            return state;
            
        case DELETEALLBOOK:
            state = initialState.books
            localStorage.setItem('booksData', JSON.stringify(state))
            return state

        default: return state
    }
}

export default reducerBook;