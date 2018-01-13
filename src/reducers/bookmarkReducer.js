import {
    LOADED_BOOKMARKS,
    REMOVE_BOOKMARK,
    ADD_BOOKMARK_SUCCESS,
    ADD_BOOKMARK,
    ADD_BOOKMARK_FAIL,
    VIEW_BOOKMARKS
} from "../actions/actionTypes";

const initialState = {
    items: [],
    newItems: 0,
    error: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADED_BOOKMARKS: {
            return {
                ...state,
                items: action.payload
            };
        }
        case ADD_BOOKMARK_SUCCESS: {
            return {
                ...state,
                newItems: state.newItems + 1,
                items: [...state.items, action.payload]
            };
        }
        case REMOVE_BOOKMARK: {
            const index = state.items.indexOf(action.payload);

            return {
                ...state,
                items: [...state.items.slice(0, index), ...state.items.slice(index + 1)]
            };
        }
        case ADD_BOOKMARK: {
            return {
                ...state,
                error: ""
            };
        }
        case ADD_BOOKMARK_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        case VIEW_BOOKMARKS: {
            return {
                ...state,
                newItems: 0
            };
        }
        default:
            return state;
    }
};
