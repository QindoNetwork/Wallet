import React from 'react';
import { Text, View } from 'react-native';

export class MyProfile extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'My demand'
    });

    render() {
        return <View><Text>TEST</Text></View>;
    }
}
