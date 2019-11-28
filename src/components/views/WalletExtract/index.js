import React from 'react';
import { Control as ControlInstance, ControlTx as ControlInstanceTx } from '@common/functions';
import CreatePassword from './CreatePassword';
import Login from './Login';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';


export class WalletExtract extends React.Component {

    state = { pass: 0 };

    async componentDidMount() {
      this.setState({ pass : await parseInt(ControlInstance.userPassword(),10) })}

    render() {

      let value = new Boolean(this.state.pass)

      if(this.state.pass == 0)
      {
        return (
                <Text>LOGIN</Text>
        )
      }
      else
      {
        return (
                <Text>LLLLL</Text>
                );
      }
    }
}
