import { createSelector } from "reselect";
import { reshapeNewsData, filterNewsBySearchTerm } from "../util/dataTransformations";

// input selector
const newsSelector = state => state.news;
const searchTermSelector = state => state.searchTerm;
const bookmarksSelector = state => state.bookmarks;
const profileImageSelector = state => state.profileImage;

// memoized selector
const resharpeNewsSelector = createSelector(
    [newsSelector],
    reshapeNewsData
);

export const allNewsSelector = createSelector(
    [resharpeNewsSelector],
    newsItems => newsItems
);

const caseInsensitiveSearchTermSelector = createSelector(
    searchTermSelector,
    searchTerm => searchTerm.toLowerCase()
);

export const searchNewsSelector = createSelector(
    [resharpeNewsSelector, caseInsensitiveSearchTermSelector],
    filterNewsBySearchTerm
);

export const bookmarkedNewsSelector = createSelector(
    [allNewsSelector, bookmarksSelector],
    (news, bookmarks) => news.filter(item => bookmarks.items.indexOf(item.url) > -1)
);

export const bookmarkNewsErrorSelector = createSelector(
    bookmarksSelector,
    bookmarks => bookmarks.error
);

export const imageSelector = createSelector(
    profileImageSelector,
    image => image
);
