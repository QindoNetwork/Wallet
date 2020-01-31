import { Button } from '@components/widgets';
import React, { Component } from 'react'
import { colors, measures } from '@common/styles';
import { View, StyleSheet } from 'react-native'

export class ChangeCrypto extends Component {

      static navigationOptions = ({ navigation, screenProps }) => ({
          title: 'Change token'
      });

  render() {

    const { togethers, gasParams } = this.props.navigation.state.params

      return (
          <View style={styles.container}>
              <View style={styles.body}>
                <View style={styles.buttonsContainer}>
                  <Button
                    children="TTE to Stablecoins"
                    onPress={() => this.props.navigation.navigate('CryptoType2', { type: "TTE", togethers, gasParams } )}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                  <Button
                    children="TTU to Stablecoins"
                    onPress={() => this.props.navigation.navigate('CryptoType2', { type: "TTU", togethers, gasParams } )}
                    />
                </View>
              </View>
          </View>
      );
  }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    }
});
