import React, { Component } from "react";
import {
    View,
    StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

import Title from "../components/Title";
import AppText from "../components/AppText";

import * as globalStyles from "../styles/global";

export default class Profile extends Component {
    render() {
        return (
            <View style={[globalStyles.COMMON_STYLES.pageContainer, styles.container]}>
                <Icon 
                    name="user"
                    style={styles.avartarIcon}
                />
                <Title>Username</Title>
                <AppText>Your Name</AppText>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    avartarIcon: {
        color: globalStyles.HEADER_TEXT_COLOR,
        fontSize: 200
    }
});
