import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TextInput, StyleSheet } from "react-native";
import * as globalStyles from "../styles/global";
import NewsFeed from "../components/NewsFeed";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ""
        };

        this.searchNews = this.searchNews.bind(this);
    }

    searchNews(text) {
        this.setState({ searchText: text });
        this.props.searchNews(text);
    }

    render() {
        return (
            <View style={globalStyles.COMMON_STYLES.pageContainer}>
                <View style={styles.search}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor={globalStyles.MUTED_COLOR}
                        style={styles.input}
                        value={this.state.searchText}
                        onChangeText={this.searchNews}
                        underlineColorAndroid="transparent"
                        returnKeyLabel="Search"
                        keyboardAppearance="light"
                    />
                </View>
                <NewsFeed
                    news={this.props.filteredNews}
                    listStyles={{}}
                    showLoadingSpinner={false}
                    addBookmark={this.props.addBookmark}
                />
            </View>
        );
    }
}

Search.propTypes = {
    filteredNews: PropTypes.arrayOf(PropTypes.object),
    searchNews: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    input: {
        height: 35,
        color: globalStyles.TEXT_COLOR,
        paddingHorizontal: 5,
        flex: 1
    },
    search: {
        borderColor: globalStyles.MUTED_COLOR,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 5
    }
});
