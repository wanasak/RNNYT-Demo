import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Linking,
    ListView,
    Modal,
    NetInfo,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
    WebView,
    Alert,
    Vibration
} from 'react-native';

import * as globalStyles from '../styles/global';
import AppText from './AppText';
import NewsItem from './NewsItem';
import SmallText from './SmallText';

export default class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.title !== row2.title
        });
        this.state = {
            dataSource: this.ds.cloneWithRows(props.news),
            modalVisible: false,
            initialLoading: true,
            refreshing: false,
            connected: true
        };

        this.renderRow = this.renderRow.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onModalOpen = this.onModalOpen.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleConnectivityChange = this.handleConnectivityChange.bind(
            this
        );
        this.showBookmarkAlert = this.showBookmarkAlert.bind(this);
    }

    componentWillMount() {
        NetInfo.isConnected.addEventListener(
            "connectionChange",
            this.handleConnectivityChange
        );
        this.refresh();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.news),
            initialLoading: false
        });
        if (nextProps.errorBookmark) {
            this.showBookmarkAlert(nextProps.errorBookmark);
        }
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            "connectionChange",
            this.handleConnectivityChange
        );
    }

    handleConnectivityChange(isConnected) {
        this.setState({
            connected: isConnected
        });
        if (isConnected) {
            this.refresh();
        }
    }

    refresh() {
        if (this.props.loadNews) {
            this.props.loadNews();
        }
    }

    onModalClose() {
        this.setState({
            modalVisible: false,
            modalUrl: undefined
        });
    }

    onModalOpen(url) {
        this.setState({
            modalVisible: true,
            modalUrl: url
        });
    }

    showBookmarkAlert(msg) {
        Vibration.vibrate();
        Alert.alert(
            "Warning",
            msg,
            [{ text: "OK" }]
        );
    }

    renderModal() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                onRequestClose={this.onModalClose}
            >
                <View style={styles.modalContent}>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity onPress={this.onModalClose}>
                            <SmallText style={styles.modalHeaderText}>Close</SmallText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(this.state.modalUrl)}
                        >
                            <SmallText style={styles.modalHeaderText}>Open in Browser</SmallText>
                        </TouchableOpacity>
                    </View>
                    <WebView
                        scalesPageToFit
                        source={{ uri: this.state.modalUrl }}
                    />
                </View>
            </Modal>
        );
    }

    renderRow(rowData, ...rest) {
        const index = parseInt(rest[1], 10);
        return (
            <NewsItem
                isBookmarkContainer={this.props.isBookmarkContainer}
                onPress={() => this.onModalOpen(rowData.url)}
                onBookmark={() => this.props.addBookmark(rowData.url)}
                onRemoveBookmark={() => this.props.removeBookmark(rowData.url)}
                style={styles.newsItem}
                index={index}
                {...rowData}
            />
        );
    }

    render() {
        const {
            listStyles = globalStyles.COMMON_STYLES.pageContainer,
            showLoadingSpinner
        } = this.props;
        const {
            initialLoading,
            refreshing,
            dataSource,
            connected
        } = this.state;

        if (!connected) {
            return (
                <View
                    style={[
                        globalStyles.COMMON_STYLES.pageContainer,
                        styles.loadingContainer
                    ]}
                >
                    <AppText>No Connection</AppText>
                </View>
            );
        }

        return initialLoading && showLoadingSpinner ? (
            <View style={[listStyles, styles.loadingContainer]}>
                <ActivityIndicator animating size="small" {...this.props} />
            </View>
        ) : (
            <View style={styles.container}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.refresh}
                        />
                    }
                    enableEmptySections
                    dataSource={dataSource}
                    renderRow={this.renderRow}
                    style={listStyles}
                />
                {this.renderModal()}
            </View>
        );
    }
}

NewsFeed.propTypes = {
    news: PropTypes.arrayOf(PropTypes.object),
    errorBookmark: PropTypes.string,
    listStyles: View.propTypes.style,
    loadNews: PropTypes.func,
    showLoadingSpinner: PropTypes.bool,
    addBookmark: PropTypes.func.isRequired,
    removeBookmark: PropTypes.func,
    isBookmarkContainer: PropTypes.bool
};

NewsFeed.defaultProps = {
    showLoadingSpinner: true,
    isBookmarkContainer: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    newsItem: {
        marginBottom: 20
    },
    modalContent: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 20,
        backgroundColor: globalStyles.BG_COLOR
    },
    closeButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row"
    },
    modalButtons: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalHeaderText: {
        color: "white"
    }
});
