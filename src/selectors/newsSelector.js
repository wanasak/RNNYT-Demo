import { createSelector } from "reselect";
import { reshapeNewsData, filterNewsBySearchTerm } from "../util/dataTransformations";

// input selector
const newsSelector = state => state.news;
const searchTermSelector = state => state.searchTerm;

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