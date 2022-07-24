import { createStore, combineReducers, applyMiddleware } from "redux";
import reducerBook from './reducers/reducerBook'
import reducerFetch from "./reducers/reducerFetch";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    library: reducerBook,
    search: reducerFetch
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;