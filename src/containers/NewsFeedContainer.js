import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addBookmark } from '../actions/bookmarkActions';
import { loadNews } from '../actions/newsActions';
import NewsFeed from '../components/NewsFeed';
import { allNewsSelector, bookmarkNewsErrorSelector } from '../selectors/newsSelector';

// import { reshapeNewsData } from '../util/dataTransformations';
const mapStateToProps = state => ({
    news: allNewsSelector(state),
    errorBookmark: bookmarkNewsErrorSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadNews,
            addBookmark
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
