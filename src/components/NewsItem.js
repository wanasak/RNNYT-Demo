import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ActionSheetIOS
} from "react-native";
import AppText from "./AppText";
import Thumbnail from "./Thumbnail";
import ByLine from "./ByLine";
import * as globalStyles from "../styles/global";

export default class NewsItem extends Component {
    constructor(props) {
        super(props);

        this.onLongPress = this.onLongPress.bind(this);
    }

    onLongPress() {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Bookmark", "Cancel"],
                cancelButtonIndex: 1,
                title: this.props.title
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    this.props.onBookmark();
                }
            }
        );
    }

    render() {
        const {
            style,
            imageUrl,
            title,
            author,
            date,
            location,
            description,
            onPress
        } = this.props;
        const accentColor =
            globalStyles.ACCENT_COLORS[
                this.props.index % globalStyles.ACCENT_COLORS.length
            ];

        return (
            <TouchableOpacity
                onPress={onPress}
                onLongPress={this.onLongPress}
                style={style}
            >
                <View>
                    <Thumbnail
                        url={imageUrl}
                        titleText={title}
                        accentColor={accentColor}
                        style={styles.thumbnail}
                    />
                    <View style={styles.content}>
                        <ByLine
                            author={author}
                            date={date}
                            location={location}
                        />
                        <AppText>{description}</AppText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

NewsItem.propType = {
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    location: PropTypes.string,
    index: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    style: View.propTypes.style,
    onPress: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    thumbnail: {
        marginBottom: 5
    },
    content: {
        paddingHorizontal: 5
    }
});
