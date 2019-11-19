import * as yup from 'yup'
import { Formik } from 'formik'
import React, { Component, Fragment } from 'react'
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { drizzleConnect } from "drizzle-react"
import styles from '../../Styles'

export default class RegisterForm extends Component {

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts
  }

  submitForm(value1) {
    this.contracts["Togethers"].methods["setUser"].cacheSend(value1, this.props.ipfs, this.props.name, this.props.languageKey, {gas: 200000, from: this.props.account, gasPrice: this.props.gasPrice})
    return this.props.navigation.navigate('PendingScreen',
      {
      account: this.props.account,
    })

  }

  render() {

    const { labelText, multiline, ...inputProps } = this.props;

    return (
      <Formik
        initialValues={{ userName: '' }}

        onSubmit={values => {
            Alert.alert(
              'Confirm',
              'profile Image: ' + this.props.ipfs + ' Name: ' + this.props.name + ' Pseudo: ' + values.userName + ', Language: ' + this.props.languageKey + ' this action will take few minuts you will be notified if success',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.submitForm(values.userName)},
            ]
          )
          }
        }
        validationSchema={yup.object().shape({
          userName: yup
            .string()
            .min(2)
            .max(40)
            .required(),
        })}
      >
        {({handleChange, values, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
          <Fragment>
            <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.textInput, multiline && styles.textarea]}
            value={values.userName}
            onChangeText={handleChange('userName')}
            onBlur={() => setFieldTouched('userName')}
            placeholder="New User"
          />
          </View>
          <View style={styles.inputWrapper}>
          <TouchableOpacity
              style={[styles.button, !isValid && styles.buttonDisabled]}
              disabled={!isValid}
              onPress={handleSubmit}>
              <Text style={styles.label}>Register</Text>
          </TouchableOpacity>
          </View>
          </Fragment>
        )}
      </Formik>

    );

  }


}

RegisterForm.propTypes = {
    labelText: PropTypes.string,
    multiline: PropTypes.bool,
};

RegisterForm.defaultProps = {
    labelText: null,
    multiline: false,
};

RegisterForm.contextTypes = {
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
