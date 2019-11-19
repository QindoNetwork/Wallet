import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text,
} from 'react-native';

import styles from '../Styles'
import Toast from 'react-native-whc-toast'

export default class WoopsScreen extends Component {

    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Toast ref="toast"/>
                <Text style={styles.screenTitle}>Woops</Text>
            </KeyboardAvoidingView>
        );
    }
}
