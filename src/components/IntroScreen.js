import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import Title from "./Title";
import AppText from "./AppText";
import { connect } from "react-redux";
import * as globalStyles from "../styles/global";
import { NavigationActions } from "react-navigation";

StatusBar.setBarStyle("light-content");

class IntroScreen extends Component {
    render() {
        const { homeScreen, onboardingScreen } = this.props;
        return (
            <View
                style={[
                    globalStyles.COMMON_STYLES.pageContainer,
                    styles.container
                ]}
            >
                <View>
                    <TouchableOpacity onPress={onboardingScreen}>
                        <Title>React Native News Reader</Title>
                        <AppText>Start Reading</AppText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// IntroScreen.propTypes = {
//     onPress: PropTypes.func.isRequired
// };

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});

const mapDispatchToProps = dispatch => ({
    onboardingScreen: () =>
        dispatch(NavigationActions.navigate({ routeName: "Onboarding" }))
});

export default connect(null, mapDispatchToProps)(IntroScreen);
