import React from 'react';
import { Text, View } from 'react-native';

export class Crypto extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'choose your cryptocurrency'
    });

    render() {
        return <View><Text>TEST</Text></View>;
    }
}
