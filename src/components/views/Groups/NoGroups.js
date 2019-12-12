import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@common/styles';

export default () => (
    <View style={styles.container}>
        <Text style={styles.message}>
            There are no groups configured. Create a new one or apply to an existing one.
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {},
    message: {
        color: colors.black
    }
});
