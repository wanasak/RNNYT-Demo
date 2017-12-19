import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const CollapsibleView = ({ children, style, hide }) => (
    <View style={[styles.container, hide ? styles.hidden : {}]}>
        <View style={[styles.absoluteContainer, style]}>
            {children}
        </View>
    </View>
);

CollapsibleView.propTypes = {
    style: View.propTypes.style,
    children: PropTypes.node,
    hide: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    absoluteContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    hidden: {
        height: 0,
        flex: 0
    }
});

export default CollapsibleView;
