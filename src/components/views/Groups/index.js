import React from 'react';
import { Text, View } from 'react-native';

export class Groups extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Your groups'
    });

    render() {
        return <View><Text>TEST</Text></View>;
    }
}
