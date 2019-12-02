import React from 'react';
import { Text, View } from 'react-native';

export class Pending extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'In progress...'
    });

    render() {
        return <View><Text>TEST</Text></View>;
    }
}
