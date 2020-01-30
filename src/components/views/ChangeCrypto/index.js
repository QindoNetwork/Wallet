import { Button } from '@components/widgets';
import React, { Component } from 'react'
import { colors, measures } from '@common/styles';
import { View, StyleSheet } from 'react-native'

export class ChangeCrypto extends Component {

      static navigationOptions = ({ navigation, screenProps }) => ({
          title: 'Change token'
      });

  render() {

    const { togethers, address, gasParams } = this.props.navigation.state.params

      return (
          <View style={styles.container}>
              <View style={styles.body}>
                <View style={styles.buttonsContainer}>
                  <Button
                    children="TTE to Stablecoins"
                    onPress={() => this.props.navigation.navigate('CryptoType2', { type: "TTE", togethers, address, gasParams } )}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                  <Button
                    children="TTU to Stablecoins"
                    onPress={() => this.props.navigation.navigate('CryptoType2', { type: "TTU", togethers, address, gasParams } )}
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
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    input: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    }
});
