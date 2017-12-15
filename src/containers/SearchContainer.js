import { searchNewsSelector } from "../selectors/newsSelector";
import { bindActionCreators } from "redux";
import { searchNews } from "../actions/newsActions";
import { connect } from "react-redux";
import Search from "../components/Search";

const mapStateToProps = state => ({
    filteredNews: searchNewsSelector(state)
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        searchNews
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);