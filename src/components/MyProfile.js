import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import {ScrollView, Text, View, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import PropTypes from "prop-types";
import { ListItem, List } from "react-native-elements";

import styles from '../Styles'

import { DemandScreen, Info} from "./Details";

class MyProfile extends Component {

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
  }

  withdraw = () => {
    return (this.props.navigation.navigate('ConfirmPaymentScreen',
        {
          target: "",
          groupID: this.props.groupID,
          value: value1,
          type: "2",
          family: "",
          crypto: "",
          account: this.props.account,
          gasPrice: this.props.gasPrice,
      }))
  }

  render() {

          return (
              <View style={styles.inputWrapper}>
<ScrollView>
<Text style={styles.label}>CURRENT</Text>
<Info
description={this.props.displayData[2]}
list1={this.props.cryptoAmounts}
list2={this.props.cryptoSymbols}
size={this.props.size}
/>
</ScrollView>

                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => { Alert.alert(
                        'Confirm',
                        'Are you sure you want close this demand? this action will take few minuts you will be notified if success',
                          [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => this.withdraw()},
                          ]
                        )
                    }
                  }>
                      <Text style={styles.label}>CLOSE</Text>
                  </TouchableOpacity>

            </View>
            )
    }

}


MyProfile.contextTypes = {
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

export default drizzleConnect(MyProfile, mapStateToProps);
