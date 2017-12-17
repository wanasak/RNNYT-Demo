import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise";

import newsFeedReducer from "./reducers/newsFeedReducer";
import searchTermReducer from "./reducers/searchTermReducer";
import bookmarkReducer from "./reducers/bookmarkReducer";
import navReducer from "./reducers/navReducer";

const logger = createLogger();

export default (initialState = {}) =>
    createStore(
        combineReducers({
            nav: navReducer,
            news: newsFeedReducer,
            searchTerm: searchTermReducer,
            bookmarks: bookmarkReducer
        }),
        initialState,
        applyMiddleware(logger, promiseMiddleware)
    );
