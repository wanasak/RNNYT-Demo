import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import SmallText from "./SmallText";
import * as globalStyles from "../styles/global";

const ByLine = ({ date, author, location }) => (
    <View>
        <View style={styles.row}>
            <SmallText style={styles.location}>{date}</SmallText>
            <SmallText style={styles.location}>{author}</SmallText>
        </View>

        {location ? (
            <View style={styles.row}>
                <SmallText style={styles.location}>{location}</SmallText>
            </View>
        ) : null}
    </View>
);

ByLine.propTypes = {
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    location: PropTypes.string
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginBottom: 5,
        justifyContent: "space-between"
    },
    location: {
        color: globalStyles.MUTED_COLOR
    }
});

export default ByLine;
