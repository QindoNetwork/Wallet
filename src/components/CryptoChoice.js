import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import {Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../Styles'
import PropTypes from 'prop-types'

class GroupsChoice extends Component {

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey: [],
      dataKey2: [],
      dataKey3: [],
      dataKey5: [],
    };

  }

  componentDidMount() {
    let address = []
    let symbols = []
    let decimals = []
    let names = []

    for ( var i = 0; i < this.props.size; i++ ) {
      address.push(this.contracts["Togethers"].methods["getTokenAddress"].cacheCall(i,{from: this.props.account}))
      symbols.push(this.contracts["Togethers"].methods["getTokenSymbol"].cacheCall(i,{from: this.props.account}))
      decimals.push(this.contracts["Togethers"].methods["getTokenDecimal"].cacheCall(i,{from: this.props.account}))
      names.push(this.contracts["Togethers"].methods["getTokenName"].cacheCall(i,{from: this.props.account}))
    }
    this.setState({
                  dataKey : address,
                  dataKey2 : symbols,
                  dataKey3 : decimals,
                  dataKey5 : names,
                })
  }

  render() {

    if (
          !(
            this.state.dataKey[this.props.size - 1] in
            this.props.contracts["Togethers"]["getTokenAddress"]

            &&

            this.state.dataKey2[this.props.size - 1] in
            this.props.contracts["Togethers"]["getTokenSymbol"]

            &&

            this.state.dataKey3[this.props.size - 1] in
            this.props.contracts["Togethers"]["getTokenDecimal"]


            &&

            this.state.dataKey5[this.props.size - 1] in
            this.props.contracts["Togethers"]["getTokenName"]

          )
        ) {
          return  <ActivityIndicator size="large" color="#0000ff" />
        }

        let list = []
        for ( var i =0; i < this.props.size; i++) {
          if ( cryptoDisabled[i] == false )
          {
        list.push({key: i,
                  address: this.props.contracts["Togethers"]["getTokenAddress"][this.state.dataKey1[i]].value,
                  symbol: this.props.contracts["Togethers"]["getTokenSymbol"][this.state.dataKey[i]].value,
                  name: this.props.contracts["Togethers"]["getTokenName"][this.state.dataKey5[i]].value,
                  decimal: this.props.contracts["Togethers"]["getTokenDecimal"][this.state.dataKey[i]].value})
                  }
        }

    return (

    <View style={styles.inputWrapper}>
    <FlatList
        data={list}
        width='100%'
        renderItem={({ item }) => (

    <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => this.props.navigation.navigate('PayScreen',
    {
      account: this.props.account,
      symbol: item.symbol,
      address: item.address,
      decimal: item.decimal,
      name: item.name,
      crypto: item.key,
      balance: this.props.balance,
      gasPrice: this.props.gasPrice,
      groupID: this.props.groupID,
      target: this.props.target,
      })
    }>
      <View style={styles.button5}>

    <Text style={styles.label}>{item.name}</Text>
    </View>
    </TouchableOpacity>
  )}
/>
    </View>
    );
  }
}

GroupsChoice.contextTypes = {
  drizzle: PropTypes.object,
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
  };
};

export default drizzleConnect(GroupsChoice, mapStateToProps);
