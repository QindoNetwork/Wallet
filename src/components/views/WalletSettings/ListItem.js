import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { measures } from '@common/styles';

export default ({ children, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.container} children={children} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        height: 64,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: measures.defaultPadding,
        borderRadius: 10,
    }
});
