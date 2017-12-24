import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ImagePickerIOS,
    Image,
    TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

import Title from "../components/Title";
import AppText from "../components/AppText";

import * as globalStyles from "../styles/global";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = { image: null };

        this.onPressIcon = this.onPressIcon.bind(this);
    }

    onPressIcon() {
        ImagePickerIOS.openSelectDialog(
            {},
            imageUri => {
                this.setState({ image: imageUri });
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
                {this.state.image ? (
                    <View style={{ paddingBottom: 20 }}>
                        <TouchableOpacity
                            onPress={this.onPressIcon}
                        >
                            <Image
                                style={styles.image}
                                source={{ uri: this.state.image }}
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
        width: 150,
        height: 150
    }
});
