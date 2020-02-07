import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, measures } from '@common/styles';

export const Button = ({ children, onPress, disabled }) => (
    <TouchableOpacity style={[styles.container, disabled && styles.buttonDisabled]} onPress={onPress} underlayColor={null} disabled={disabled}>
        <Text style={styles.title} children={children} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: 'darkslategray',
        borderColor: 'darkslategray',
        padding: measures.defaultPadding,
        borderRadius: 6,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    title: {
        color: 'white',
        fontSize: 16
    }
});
