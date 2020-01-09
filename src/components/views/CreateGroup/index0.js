import * as yup from 'yup'
import { Formik } from 'formik'
import { General as GeneralActions  } from '@common/actions';
import React, { Component, Fragment } from 'react'
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Gas as gas } from '@common/constants';
import { Keyboard, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react';
@inject('prices', 'wallet')
@observer

export class CreateGroup extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Create a group'
  });

    state = { gasParam: this.props.navigation.getParam('gasParam'), functionIndex: gas.createGroup };

  async submitForm(value) {
    Keyboard.dismiss();
    var togethers = this.props.navigation.getParam('togethers')
    try {
      let overrides = {
          gasLimit: this.state.gasParam[this.state.createGroup].limit,
          gasPrice: this.state.gasParam[this.state.createGroup].price * 1000000000,
          //nonce: 123,
          //value: utils.parseEther('1.0'),
          };
      await togethers.createGroup(value,overrides)
      this.props.navigation.navigate('WalletDetails', { wallet: this.props.swallet.item, replaceRoute: true, leave: 3 });
      GeneralActions.notify('Your transaction was sent successfully and now is waiting for confirmation. Please wait', 'long');
    } catch (e) {
        GeneralActions.notify(e.message, 'long');
    }
  }

  render() {

    const maxPrice =  this.state.gasParam[this.state.createGroup].limit * this.state.gasParam[this.state.createGroup].price

    const EthPrice = maxPrice / 1000000000

    return (
        <Formik
          initialValues={{ groupName: '' }}
          onSubmit={values => {
            Alert.alert(
              'SignUp',
              'It will cost maximum ' + EthPrice +  ' ETH',
              [
                  { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                  { text: 'Confirm', onPress: () => this.submitForm(values.groupName) }
              ],
              { cancelable: false }
          );
          }
        }
          validationSchema={yup.object().shape({
            groupName: yup
              .string()
              .min(2)
              .max(30)
              .required(),
          })}
        >
          {({handleChange, values, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
            <Fragment>
              <View style={styles.container}>
              <View style={styles.body}>
                <TextInput
                  style={styles.input}
                  value={values.groupName}
                  onChangeText={handleChange('groupName')}
                  onBlur={() => setFieldTouched('groupName')}
                  placeholder="Group name"
                  />
            <View style={styles.buttonsContainer}>
                <Button
                    children="CREATE A NEW GROUP"
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
