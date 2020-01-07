import * as yup from 'yup'
import { Formik } from 'formik'
import { General as GeneralActions  } from '@common/actions';
import { Button } from '@components/widgets';
import React, { Component, Fragment } from 'react'
import { colors, measures } from '@common/styles';
import {Keyboard, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react';
import { Gas as gas } from '@common/constants';
@inject('prices', 'wallet')
@observer

export class OpenDemand extends Component {

  static navigationOptions = { title: "Open demand" };

  state = { gasParam: this.props.navigation.getParam('gasParam'), functionIndex: gas.askForFunds };

   async submitForm(value) {
    Keyboard.dismiss();
    const togethers = this.props.navigation.getParam('togethers')
    const groupID = this.props.navigation.getParam('groupID')
    try {
      let overrides = {
          gasLimit: this.state.gasParam[this.state.functionIndex].limit,
          gasPrice: this.state.gasParam[this.state.functionIndex].price * 1000000000,
          //nonce: 123,
          //value: utils.parseEther('1.0'),
          };
          await togethers.askForFunds(groupID,value,overrides)
          this.props.navigation.navigate('WalletDetails', { wallet: this.props.swallet.item, replaceRoute: true, leave: 3 });
          GeneralActions.notify('Your transaction was sent successfully and now is waiting for confirmation. Please wait', 'long');
    } catch (e) {
      GeneralActions.notify(e.message, 'long');
    }
  }

  render() {

    const maxPrice =  this.state.gasParam[this.state.functionIndex].limit * this.state.gasParam[this.state.functionIndex].price

    const EthPrice = maxPrice / 1000000000

    return (
        <Formik
          initialValues={{ description: '' }}
          onSubmit={values => {
            Alert.alert(
              'SignUp',
              'It will cost maximum ' + EthPrice + ' ETH',
              [
                  { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                  { text: 'Confirm', onPress: () => this.submitForm(values.description) }
              ],
              { cancelable: false }
          );
          }
        }
          validationSchema={yup.object().shape({
            description: yup
              .string()
              .min(2)
              .max(300)
              .required(),
          })}
        >
          {({handleChange, values, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
            <Fragment>
              <View style={styles.container}>
              <View style={styles.body}>
                <TextInput
                  style={styles.input}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={() => setFieldTouched('description')}
                  placeholder="description"
                  />
                  <View style={styles.buttonsContainer}>
                      <Button
                          children="DEMAND"
                          disabled={!isValid}
                          onPress={handleSubmit}/>
                  </View>
                  </View>
                  </View>
            </Fragment>
          )}
        </Formik>
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
