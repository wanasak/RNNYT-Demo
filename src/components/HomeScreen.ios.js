import React, { Component } from "react";
import { TabBarIOS, Text, StatusBar, Alert, Vibration } from "react-native";
import NewsFeedContainer from "../containers/NewsFeedContainer";
import SearchContainer from "../containers/SearchContainer";
import * as globalStyles from "../styles/global";
import BookmarksContainer from "../containers/BookmarksContainer";

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
                <TabBarIOS.Item
                    badge={3}
                    systemIcon={"featured"}
                    selected={this.state.tab === "newsFeed"}
                    onPress={() => this.setState({ tab: "newsFeed" })}
                >
                    <NewsFeedContainer />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    systemIcon={"search"}
                    selected={this.state.tab === "search"}
                    onPress={() => this.setState({ tab: "search" })}
                >
                    <SearchContainer />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    systemIcon={"bookmarks"}
                    selected={this.state.tab === "bookmarks"}
                    onPress={() => this.setState({ tab: "bookmarks" })}
                    // onPress={() => this.showBookmarkAlert()}
                >
                    <BookmarksContainer />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}
