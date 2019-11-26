import React from 'react';
import { Text, View } from 'react-native';

export class AddProfile extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Add a user'
    });

    render() {
        return <View><Text>TEST</Text></View>;
    }
}
