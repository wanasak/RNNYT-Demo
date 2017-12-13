import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import * as globalStyles from '../styles/global';

const AppText = ({ children, styles, ...rest }) => (
    <Text style={[globalStyles.COMMON_STYLES.text, styles]} {...rest}>
        {children}
    </Text>
)

AppText.propTypes = {
    style: Text.propTypes.style,
    children: PropTypes.node
}

export default AppText;
