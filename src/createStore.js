import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise";
import thunk from "redux-thunk";

import newsFeedReducer from "./reducers/newsFeedReducer";
import searchTermReducer from "./reducers/searchTermReducer";
import bookmarkReducer from "./reducers/bookmarkReducer";
import navReducer from "./reducers/navReducer";
import profileImageReducer from "./reducers/profileImageReducer";

const logger = createLogger();

export default (initialState = {}) =>
    createStore(
        combineReducers({
            nav: navReducer,
            news: newsFeedReducer,
            searchTerm: searchTermReducer,
            bookmarks: bookmarkReducer,
            profileImage: profileImageReducer
        }),
        initialState,
        applyMiddleware(thunk, logger, promiseMiddleware)
    );
