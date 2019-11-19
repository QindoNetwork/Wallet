import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import { Text, View, FlatList, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from "prop-types";
import { ListItem, List } from "react-native-elements";
import Description from "./Description";

import styles from '../Styles'

class GroupsList extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey1: [],
      dataKey: [],
      dataKey2 : null
    };

  }

  componentDidMount() {
    let keys = []
    let names = []
    for ( var i = 0; i < this.props.getGroupsLength; i++ ) {
      mappGiven[mappProfileInGroup[groupID][msg.sender].DemandID
      keys.push(this.contracts["Togethers"].methods["getGroupID"].cacheCall(i,{from: this.props.account}))
      names.push(this.contracts["Togethers"].methods["getGroup"].cacheCall(i,{from: this.props.account}))
    }
    this.setState({
                  dataKey1 : keys,
                  dataKey2 : this.contracts["Togethers"].methods["getSize"].cacheCall(),
                  dataKey : names
                })
  }

  render() {


    if (this.props.getGroupsLength !=  0){

        // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
        if (
          !(
            this.state.dataKey1[this.props.getGroupsLength - 1] in
            this.props.contracts["Togethers"]["getGroupID"]

            &&

            this.state.dataKey[this.props.getGroupsLength - 1] in
            this.props.contracts["Togethers"]["getGroup"]

            &&

            this.state.dataKey2 in
            this.props.contracts["Togethers"]["getSize"]
          )
        ) {
          return  <ActivityIndicator size="large" color="#0000ff" />
        }

        let list = []
        for ( var i =0; i < this.props.getGroupsLength; i++) {
          if ( this.props.contracts["Togethers"]["getGroupID"][this.state.dataKey1[i]].value != 0 )
          {
        list.push({key: this.props.contracts["Togethers"]["getGroupID"][this.state.dataKey1[i]].value,
                  name: this.props.contracts["Togethers"]["getGroup"][this.state.dataKey[i]].value})
                  }
        }

        let cryptosSize = this.props.contracts["Togethers"]["getSize"][this.state.dataKey2].value

    return (
    <View style={styles.inputWrapper}>
    <FlatList
        data={list.sort((prev, next) => prev.name.localeCompare(next.name))}
        width='100%'
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.button2}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('ProfilesScreen',
          {
            account: this.props.account,
            groupID: item.key,
            gasPrice: this.props.gasPrice,
            groupName: item.name,
            max: this.props.max,
            balance: this.props.balance,
            size: cryptosSize,
            })
          }>

          <Description
          account={this.props.account}
          groupID={item.key}
          pseudo={item.name}
          name={item.name}
          type="1"
          src=""
        />
        </TouchableOpacity>
        )}
      />

    </View>
    );
  }

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>You have no group</Text>
    </View>
  )
  }
}

GroupsList.contextTypes = {
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

export default drizzleConnect(GroupsList, mapStateToProps);
