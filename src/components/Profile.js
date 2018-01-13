import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    StyleSheet,
    ImagePickerIOS,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

import Title from "../components/Title";
import AppText from "../components/AppText";

import * as globalStyles from "../styles/global";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.onPressIcon = this.onPressIcon.bind(this);
    }

    componentWillMount() {
        if (this.props.loadProfileImage) {
            this.props.loadProfileImage();
        }
    }

    onPressIcon() {
        ImagePickerIOS.openSelectDialog(
            {},
            imageUri => {
                this.props.saveProfileImage(imageUri);
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {
        return (
            <View
                style={[
                    globalStyles.COMMON_STYLES.pageContainer,
                    styles.container
                ]}
            >
                {this.props.image ? (
                    <View style={{ paddingBottom: 20 }}>
                        <TouchableOpacity
                            onPress={this.onPressIcon}
                        >
                            <Image
                                style={styles.image}
                                source={{ uri: this.props.image }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Icon
                        name="user"
                        style={styles.avartarIcon}
                        onPress={this.onPressIcon}
                    />
                )}
                <Title>Username</Title>
                <AppText>Your Name</AppText>
            </View>
        );
    }
}

Profile.proptypes = {
    image: PropTypes.string,
    loadProfileImage: PropTypes.func,
    saveProfileImage: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    avartarIcon: {
        color: globalStyles.HEADER_TEXT_COLOR,
        fontSize: 200
    },
    image: {
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_WIDTH * 0.4,
        borderRadius: (SCREEN_WIDTH * 0.4)/2,
    }
});
