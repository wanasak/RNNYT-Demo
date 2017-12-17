// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import {
//     View,
//     TouchableOpacity,
//     StyleSheet,
//     StatusBar
// } from "react-native";
// import Title from "./Title";
// import AppText from "./AppText";
// import * as globalStyles from "../styles/global";

// StatusBar.setBarStyle("light-content");

// class IntroScreen extends Component {
//     render() {
//         const { navigate } = this.props.navigation;
//         return (
//             <View
//                 style={[
//                     globalStyles.COMMON_STYLES.pageContainer,
//                     styles.container
//                 ]}
//             >
//                 <TouchableOpacity onPress={() => navigate("Home")}>
//                     <Title>React Native News Reader</Title>
//                     <AppText>Start Reading</AppText>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

// // IntroScreen.propTypes = {
// //     onPress: PropTypes.func.isRequired
// // };

// const styles = StyleSheet.create({
//     container: {
//         marginBottom: 0,
//         justifyContent: "center",
//         alignItems: "center"
//     }
// });

// export default IntroScreen;

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
        const { homeScreen } = this.props;
        return (
            <View
                style={[
                    globalStyles.COMMON_STYLES.pageContainer,
                    styles.container
                ]}
            >
                <TouchableOpacity onPress={homeScreen}>
                    <Title>React Native News Reader</Title>
                    <AppText>Start Reading</AppText>
                </TouchableOpacity>
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
    homeScreen: () =>
        dispatch(NavigationActions.navigate({ routeName: "Home" }))
});

export default connect(null, mapDispatchToProps)(IntroScreen);
