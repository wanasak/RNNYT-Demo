import React, { Component } from "react";
import { TabBarIOS, Text, StatusBar, Alert, Vibration } from "react-native";
import NewsFeed from "./NewsFeed";
import Search from "./Search";
import * as globalStyles from "../styles/global";

StatusBar.setBarStyle("light-content");

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: "newsFeed"
        };
    }

    showBookmarkAlert() {
        Vibration.vibrate();
        Alert.alert(
            "Coming Soon!",
            "We're hard at work on this feature, check back in the near future.",
            [{ text: "OK", onPress: () => console.log("User pressed OK") }]
        );
    }

    render() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    badge={3}
                    systemIcon={"featured"}
                    selected={this.state.tab === "newsFeed"}
                    onPress={() => this.setState({ tab: "newsFeed" })}
                >
                    <NewsFeed />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    systemIcon={"search"}
                    selected={this.state.tab === "search"}
                    onPress={() => this.setState({ tab: "search" })}
                >
                    <Search />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    systemIcon={"bookmarks"}
                    selected={this.state.tab === "bookmarks"}
                    onPress={() => this.showBookmarkAlert()}
                >
                    <Text>Bookmarks</Text>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}
