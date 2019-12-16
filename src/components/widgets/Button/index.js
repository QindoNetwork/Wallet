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
        backgroundColor: colors.primary,
        borderColor: colors.secondary,
        padding: measures.defaultPadding,
        borderRadius: 4
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    title: {
        color: colors.secondary,
        fontSize: 16
    }
});
