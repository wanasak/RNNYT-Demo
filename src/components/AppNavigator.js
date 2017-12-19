import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import { connect } from "react-redux";

import HomeScreen from "../components/HomeScreen";
import IntroScreen from "../components/IntroScreen";
import Onboarding from "../components/Onboarding";
import Profile from "../components/Profile";
import * as globalStyles from "../styles/global";

const styles = StyleSheet.create({
    header: {
        backgroundColor: globalStyles.BAR_COLOR
    }
});

const navigationConfig = {
    navigationOptions: {
        headerStyle: styles.header,
        headerTitleStyle: {
            color: "white"
        },
        headerBackTitleStyle: {
            color: "white"
        },
        headerTintColor: "white"
    }
};

export const AppNavigator = StackNavigator(
    {
        Intro: {
            screen: IntroScreen,
            navigationOptions: {
                headerTitle: "Welcome",
                headerBackTitle: "Back"
            }
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                headerTitle: "RNNYT"
            }
        },
        Onboarding: {
            screen: Onboarding
        },
        Profile: {
            screen: Profile
        }
    },
    navigationConfig
);

const AppWithNavigation = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigation.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigation);
