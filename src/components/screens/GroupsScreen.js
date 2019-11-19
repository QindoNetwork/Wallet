import React, { Component } from "react";
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import GroupsList from "../components/GroupsList";

import styles from '../Styles'

import Toast from 'react-native-whc-toast'
import ErrorBoundary from 'react-native-error-boundary'

class GroupsScreen extends Component {

  render() {

    const { navigation } = this.props;
    const gasPrice = navigation.getParam('gasPrice');
    const account = navigation.getParam('account');
    const getGroupsLength = navigation.getParam('getGroupsLength');
    const balance = navigation.getParam('balance');
    const max = navigation.getParam('max');

if (getGroupsLength < max)

{

    return(

      <View       style={styles.container}>
      <ErrorBoundary  FallbackComponent={CustomFallback}>
      <Toast ref="toast"/>
      <Text       style={styles.screenTitle}>Your groups</Text>
      <ScrollView>
      <GroupsList navigation={this.props.navigation}
                  account={account}
                  getGroupsLength={getGroupsLength}
                  gasPrice={gasPrice}
                  max={max}
                  balance={balance}
                  />
      </ScrollView>
      <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('CreateGroupScreen',
          {
            account: account,
            gasPrice: gasPrice,
          })
          }>
          <Text style={styles.label}>CREATE NEW GROUP</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('AskGroupScreen',
          {
            account: account,
            gasPrice: gasPrice,
          })
          }>
          <Text style={styles.label}>APPLY FOR AN EXISTING GROUP</Text>
      </TouchableOpacity>
      </ErrorBoundary>
      </View>
    );
  }

  else

  {

      return(

        <View       style={styles.container}>
        <ErrorBoundary  FallbackComponent={CustomFallback}>
        <Toast ref="toast"/>
        <Text       style={styles.screenTitle}>Your groups</Text>
        <ScrollView>
        <GroupsList navigation={this.props.navigation}
                    account={account}
                    getGroupsLength={getGroupsLength}
                    gasPrice={gasPrice}
                    balance={balance}
                    />
        </ScrollView>
        </ErrorBoundary>
        </View>
      );
    }

  }
}

export default GroupsScreen;

class Error extends Component {

    render() {

        return   <Text style={styles.screenTitle}>ERROR</Text>

    }
}

const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <Error/>
)
