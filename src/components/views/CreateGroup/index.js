import * as yup from 'yup'
import { Formik } from 'formik'
import { Contracts, General as GeneralActions  } from '@common/actions';
import React, { Component, Fragment } from 'react'
import { colors, measures } from '@common/styles';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'

export class CreateGroup extends Component {

  state = {loading: 0, max: 0 };

  async componentDidMount() {

    try {
      this.setState({
                      //gasPrice: parseInt (await Contracts.getGasPriceCreateGroup(),10),
                      //gasLimit: parseInt (await Contracts.getGasLimitCreateGroup(),10),
                      loading: 1
                    })
    } catch (e) {
        GeneralActions.notify(e.message, 'long');
    }
  }

  async submitForm(value) {
    Keyboard.dismiss();
    let togethers = this.props.navigation.getParam('togethers')
    try {
      // { gasLimit: this.state.gasLimit, gasPrice: this.state.gasPrice }
      await togethers.createGroup(value)
      GeneralActions.notify("working", 'long');
    } catch (e) {
        GeneralActions.notify(e.message, 'long');
    }
  }

  render() {

    if (this.state.loading ===  0){

      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <ActivityIndicator size="large"/>
        </View>
      </View>

    )

    }

      return (
        <Formik
          initialValues={{ groupName: '' }}
          onSubmit={values => {
              Alert.alert(
                'Confirm',
                'Create group ' + values.groupName + ' this action will take few minuts you will be notified if success',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.submitForm(values.groupName)},
              ]
            )
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
            <TextInput
              style={styles.input}
              value={values.groupName}
              onChangeText={handleChange('groupName')}
              onBlur={() => setFieldTouched('groupName')}
              placeholder="New Group"
            />
            </View>
            <View style={styles.container}>
            <TouchableOpacity
                style={[styles.buttonsContainer, !isValid && styles.buttonDisabled]}
                disabled={!isValid}
                color="white"
                accessibilityLabel="CREATE NEW GROUP"
                onPress={handleSubmit}>
                <Text style={styles.label}>CREATE NEW GROUP</Text>
            </TouchableOpacity>

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
