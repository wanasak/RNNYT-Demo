import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    loadBookmarks,
    addBookmark,
    removeBookmark
} from "../actions/bookmarkActions";
import NewsFeed from "../components/NewsFeed";
import { bookmarkedNewsSelector } from "../selectors/newsSelector";

const mapStateToProps = state => ({
    news: bookmarkedNewsSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadNews: loadBookmarks,
            addBookmark,
            removeBookmark
        },
        dispatch
    );

const BookmarksContainer = ({
    news,
    loadNews,
    addBookmark,
    removeBookmark
}) => (
    <NewsFeed
        news={news}
        loadNews={loadNews}
        addBookmark={addBookmark}
        removeBookmark={removeBookmark}
        isBookmarkContainer={true}
    />
);

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksContainer);
