import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadBookmarks, addBookmark } from "../actions/bookmarkActions";
import NewsFeed from "../components/NewsFeed";
import { bookmarkedNewsSelector } from "../selectors/newsSelector";

const mapStateToProps = state => ({
    news: bookmarkedNewsSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadNews: loadBookmarks,
            addBookmark
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
