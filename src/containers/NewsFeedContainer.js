import { bindActionCreators } from "redux";
import { loadNews } from "../actions/newsActions";
import NewsFeed from "../components/NewsFeed";
import { connect } from "react-redux";
// import { reshapeNewsData } from '../util/dataTransformations';
import { allNewsSelector } from "../selectors/newsSelector";

const mapStateToProps = state => ({
    news: allNewsSelector(state)
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        loadNews
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);