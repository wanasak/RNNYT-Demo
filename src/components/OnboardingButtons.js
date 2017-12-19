import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { LIGHT_OVERLAY_COLOR } from '../styles/global';
import Button from './Button';
import LinkButton from './LinkButton';

const OnboardingButtons = ({
    totalItems,
    currentIndex,
    movePrevious,
    moveNext,
    moveFinal
}) => (
    <View style={styles.container}>
        <LinkButton active={currentIndex > 0} onPress={movePrevious}>
            Previous
        </LinkButton>
        {currentIndex === totalItems - 1 ? (
            <Button onPress={moveFinal}>Done</Button>
        ) : (
            <Button onPress={moveNext}>Next</Button>
        )}
    </View>
);

OnboardingButtons.propTypes = {
    totalItems: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    movePrevious: PropTypes.func.isRequired,
    moveNext: PropTypes.func.isRequired,
    moveFinal: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 0.25,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingVertical: 20,
        position: "absolute",
        backgroundColor: LIGHT_OVERLAY_COLOR,
        bottom: 0,
        left: 0,
        right: 0
    }
});

export default OnboardingButtons;
