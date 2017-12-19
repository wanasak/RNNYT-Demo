import React, { Component } from "react";
import { StatusBar, TabBarIOS } from "react-native";
import Icon from 'react-native-vector-icons/EvilIcons';

import BookmarksContainer from "../containers/BookmarksContainer";
import NewsFeedContainer from "../containers/NewsFeedContainer";
import SearchContainer from "../containers/SearchContainer";
import Profile from "../components/Profile";

StatusBar.setBarStyle("light-content");

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: "newsFeed"
        };
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
                    onPress={() => this.setState({ tab: "newsFeed" })}
                >
                    <NewsFeedContainer />
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName={"search"}
                    title={"Search"}
                    selected={this.state.tab === "search"}
                    onPress={() => this.setState({ tab: "search" })}
                >
                    <SearchContainer />
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName={"paperclip"}
                    title={"Bookmarks"}
                    selected={this.state.tab === "bookmarks"}
                    onPress={() => this.setState({ tab: "bookmarks" })}
                    // onPress={() => this.showBookmarkAlert()}
                >
                    <BookmarksContainer />
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName={"user"}
                    title={"Profile"}
                    selected={this.state.tab === "profile"}
                    onPress={() => this.setState({ tab: "profile" })}
                >
                    <Profile />
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }
}
