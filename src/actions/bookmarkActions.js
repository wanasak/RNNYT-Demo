import {
    ADD_BOOKMARK_SUCCESS,
    ADD_BOOKMARK_FAIL,
    LOADED_BOOKMARKS,
    REMOVE_BOOKMARK,
    ADD_BOOKMARK,
    VIEW_BOOKMARKS
} from "./actionTypes";
import { AsyncStorage } from "react-native";

export const viewBookmark = () => {
    return {
        type: VIEW_BOOKMARKS
    };
}

export const addBookmark = url => async dispatch => {
    dispatch({ type: ADD_BOOKMARK });

    let storagedBookmarks = await AsyncStorage.getItem("bookmarks");

    if (storagedBookmarks && storagedBookmarks.length) {
        let bookmarkArray = JSON.parse(storagedBookmarks);

        if (bookmarkArray.indexOf(url) > -1) {
            return dispatch(failure("This news is already bookmarked."));
        }
        await AsyncStorage.setItem(
            "bookmarks",
            JSON.stringify([...bookmarkArray, url])
        );
    } else {
        await AsyncStorage.setItem("bookmarks", JSON.stringify([url]));
    }

    dispatch(success(url));

    function success(url) {
        return { type: ADD_BOOKMARK_SUCCESS, payload: url };
    }
    function failure(error) {
        return { type: ADD_BOOKMARK_FAIL, payload: error };
    }
};

export const removeBookmark = url => {
    AsyncStorage.getItem("bookmarks").then(bookmarks => {
        if (bookmarks) {
            const bookmarkArray = JSON.parse(bookmarks);
            const [url, ...remainingBookmarks] = bookmarkArray;

            AsyncStorage.setItem(
                "bookmarks",
                JSON.stringify(remainingBookmarks)
            );
        }
    });

    return {
        type: REMOVE_BOOKMARK,
        payload: url
    };
};

export const loadBookmarks = () => {
    return {
        type: LOADED_BOOKMARKS,
        payload: AsyncStorage.getItem("bookmarks").then(bookmarks => {
            if (bookmarks) {
                return JSON.parse(bookmarks);
            }
            return [];
        })
    };
};
