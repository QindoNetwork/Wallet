import React, { Component } from "react";
import { View, FlatList, Text, Button, ActivityIndicator, TouchableOpacity,} from 'react-native';
import MyProfile from "../components/MyProfile";
import styles from '../Styles'

import Toast from 'react-native-whc-toast'
import ErrorBoundary from 'react-native-error-boundary'

class MyProfileScreen extends Component {

  render() {

    const account = this.props.navigation.getParam('account');
    const profileName = this.props.navigation.getParam('user');
    const groupID = this.props.navigation.getParam('groupID');
    const groupName = this.props.navigation.getParam('groupName');
    const gasPrice = this.props.navigation.getParam('gasPrice');
    const balance = this.props.navigation.getParam('balance');
    const size = this.props.navigation.getParam('size');
    const displayData = this.props.navigation.getParam('displayData');
    const cryptoSymbols = this.props.navigation.getParam('cryptoSymbols');
    const cryptoAmounts = this.props.navigation.getParam('cryptoAmounts');
    const length = this.props.navigation.getParam('length');


return (
      <View style={styles.container}>
      <ErrorBoundary  FallbackComponent={CustomFallback}>
      <Toast ref="toast"/>
      <Text style={styles.screenTitle}>Demand</Text>

        <MyProfile navigation={this.props.navigation} gasPrice={gasPrice} account={account}
        groupID={groupID} profileName={profileName} balance={balance}
        size={size} displayData={displayData} length={length} cryptoAmounts={cryptoAmounts} cryptoSymbols={cryptoSymbols}
        />
</ErrorBoundary>
      </View>
    )
}

}

export default MyProfileScreen;

class Error extends Component {

    render() {

        return   <Text style={styles.screenTitle}>ERROR</Text>

    }
}

const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <Error/>
)
