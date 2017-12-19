import React from "react";
import PropTypes from "prop-types";
import {
    View,
    StyleSheet
} from "react-native";

import Button from "./Button";

const LinkButton = ({ style, children, ...rest }) => (
    <Button
        {...rest}
        style={[style, styles.button]}
    >
        {children}
    </Button>
);

LinkButton.propTypes = {
    style: View.propTypes.style,
    children: PropTypes.node
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 0
    }
});

export default LinkButton;