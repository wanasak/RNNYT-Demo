import React, { Component } from "react";
import { StatusBar, TabBarIOS } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { NavigationActions } from "react-navigation";
import { HeaderBackButton } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import BookmarksContainer from "../containers/BookmarksContainer";
import NewsFeedContainer from "../containers/NewsFeedContainer";
import ProfileContainer from "../containers/ProfileContainer";
import SearchContainer from "../containers/SearchContainer";
import { newBookmarkSelector } from "../selectors/newsSelector";
import { viewBookmark } from "../actions/bookmarkActions";

StatusBar.setBarStyle("light-content");

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: (
            <HeaderBackButton
                tintColor="white"
                title="Back"
                onPress={() => {
                    navigation.dispatch(NavigationActions.back());
                    navigation.dispatch(NavigationActions.back());
                }}
            />
        )
    });

    constructor(props) {
        super(props);

        this.state = {
            tab: "newsFeed"
        };
    }

    handleTabSelected(tab) {
        if (tab === "bookmarks") {
            this.props.viewBookmark();
        }
        this.setState({ tab });
    }

    // showBookmarkAlert() {
    //     Vibration.vibrate();
    //     Alert.alert(
    //         "Coming Soon!",
    //         "We're hard at work on this feature, check back in the near future.",
    //         [{ text: "OK", onPress: () => console.log("User pressed OK") }]
    //     );
    // }

    render() {
        return (
            <TabBarIOS>
                <Icon.TabBarItemIOS
                    iconName={"star"}
                    title={"News"}
                    selected={this.state.tab === "newsFeed"}
                    onPress={() => this.handleTabSelected("newsFeed")}
                >
                    <NewsFeedContainer />
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName={"search"}
                    title={"Search"}
                    selected={this.state.tab === "search"}
                    onPress={() => this.handleTabSelected("search")}
                >
                    <SearchContainer />
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    badge={
                        this.props.unreadBookmarks > 0
                            ? this.props.unreadBookmarks
                            : null
                    }
                    iconName={"paperclip"}
                    title={"Bookmarks"}
                    selected={this.state.tab === "bookmarks"}
                    onPress={() => this.handleTabSelected("bookmarks")}
                    // onPress={() => this.showBookmarkAlert()}
                >
                    <BookmarksContainer />
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName={"user"}
                    title={"Profile"}
                    selected={this.state.tab === "profile"}
                    onPress={() => this.handleTabSelected("profile")}
                >
                    <ProfileContainer />
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }
}

const mapStateToProps = state => ({
    unreadBookmarks: newBookmarkSelector(state)
});

// const mapDispatchToProps = dispatch => ({
//     introScreen: () =>
//         dispatch(NavigationActions.navigate({ routeName: "Intro" }))
// });

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            viewBookmark
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
