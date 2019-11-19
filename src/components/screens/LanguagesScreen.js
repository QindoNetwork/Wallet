import React, { Component } from 'react';
import {
    ScrollView, Text, View,
} from 'react-native';

import styles from '../Styles'

import Toast from 'react-native-whc-toast'

import LanguagesForm from '../components/forms/LanguagesForm';
import ErrorBoundary from 'react-native-error-boundary'

export default class LanguagesSceen extends Component {

    render() {

      const account = this.props.navigation.getParam('account');
      const gasPrice = this.props.navigation.getParam('gasPrice');
      const name = this.props.navigation.getParam('name');
      const pseudo = this.props.navigation.getParam('pseudo');
      const language = this.props.navigation.getParam('language');
      const ipfs = this.props.navigation.getParam('ipfs');

        return (

          <View style={styles.container}>
          <ErrorBoundary  FallbackComponent={CustomFallback}>
          <Toast ref="toast"/>
            <Text style={styles.screenTitle}>Languages</Text>
            <ScrollView>
              <LanguagesForm navigation={this.props.navigation} gasPrice={gasPrice} account = {account}
              name={name} pseudo={pseudo} language={language} ipfs={ipfs}/>
            </ScrollView>
            </ErrorBoundary>
          </View>
        )
    }
}

class Error extends Component {

    render() {

        return   <Text style={styles.screenTitle}>ERROR</Text>

    }
}

const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <Error/>
)
