import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react'
import {View, TextInput, Text, TouchableOpacity, Alert  } from 'react-native'
import PropTypes from 'prop-types'
import { drizzleConnect } from "drizzle-react"

import styles from '../../Styles'

export default class AskForm extends Component {

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

  }

  submitForm = (value) => {
    this.contracts["Togethers"].methods["ask"].cacheSend(value, {gas: 200000, from: this.props.account, gasPrice: this.props.gasPrice});
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
                'Apply for ' + values.groupName + ' this action will take few minuts you will be notified if success',
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
              placeholder="Group Name"
            />
            </View>
            <View style={styles.inputWrapper}>
            <TouchableOpacity
                style={[styles.button, !isValid && styles.buttonDisabled]}
                disabled={!isValid}
                color="white"
                accessibilityLabel="Ask"
                onPress={handleSubmit}>
                <Text style={styles.label}>Ask</Text>
            </TouchableOpacity>

            </View>
            </Fragment>
          )}
        </Formik>
      );
  }
}

AskForm.propTypes = {
    labelText: PropTypes.string,
    multiline: PropTypes.bool,
};

AskForm.defaultProps = {
    labelText: null,
    multiline: false,
};

AskForm.contextTypes = {
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
