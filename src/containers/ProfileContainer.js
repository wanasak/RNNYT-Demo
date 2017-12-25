import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveProfileImage, loadProfileImage } from "../actions/profileActions";
import Profile from "../components/Profile";
import { imageSelector } from "../selectors/newsSelector";

const mapStateToProps = state => ({
    image: imageSelector(state)
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveProfileImage,
        loadProfileImage
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);