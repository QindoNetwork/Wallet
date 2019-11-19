import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react'
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { drizzleConnect } from "drizzle-react"

import styles from '../../Styles'

export default class CreateGroupForm extends Component {

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

  }

  submitForm = (value) => {
  this.contracts["Togethers"].methods["createGroup"].cacheSend(value, {gas: 200000, from: this.props.account, gasPrice: this.props.gasPrice});
  return this.props.navigation.navigate('PendingScreen',
    {
    account: this.props.account,
  })
}

  render() {

      const { labelText, multiline, ...inputProps } = this.props;

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
              <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput, multiline && styles.textarea]}
              value={values.groupName}
              onChangeText={handleChange('groupName')}
              onBlur={() => setFieldTouched('groupName')}
              placeholder="New Group"
            />
            </View>
            <View style={styles.inputWrapper}>
            <TouchableOpacity
                style={[styles.button, !isValid && styles.buttonDisabled]}
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

CreateGroupForm.propTypes = {
    labelText: PropTypes.string,
    multiline: PropTypes.bool,
};

CreateGroupForm.defaultProps = {
    labelText: null,
    multiline: false,
};

CreateGroupForm.contextTypes = {
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
