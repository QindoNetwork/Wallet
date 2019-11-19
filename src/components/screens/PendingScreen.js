import React, { Component } from 'react'
import timer from 'react-native-timer'
import {
    TouchableOpacity, Text, View, ActivityIndicator
} from 'react-native';

export default class PendingScreen extends React.Component {
  state = {
    showMsg: false
  };

  componentDidMount() {

    this.setState({showMsg: true}, () => timer.setTimeout(
      this, 'hideMsg', () => this.setState({showMsg: false}), 200000
    ));
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  render() {
    if(this.state.showMsg === true){
        return <ActivityIndicator size="large" color="#0000ff" />
        }

    else {
      return this.props.navigation.navigate('LoginScreen',
      {
        account: this.props.account
        })
  }

  }
}
