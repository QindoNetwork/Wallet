import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react'
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { drizzleConnect } from "drizzle-react"

import styles from '../../Styles'

export default class DescriptionDemandForm extends Component {

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

  }

  submitForm = (value) => {
    this.contracts["Togethers"].methods["askForFunds"].cacheSend(this.props.groupID, value, {gas: 200000, from: this.props.account , gasPrice: this.props.gasPrice});
    return this.props.navigation.navigate('PendingScreen',
      {
      account: this.props.account,
    })
  }

  render() {

      const { labelText, multiline, ...inputProps } = this.props;

    return (
      <View style={styles.inputWrapper}>
      <Formik
        initialValues={{ description: ''}}

        onSubmit={values => {
            Alert.alert(
              'Confirm',
              'Claim for' + this.props.amount + ' $, this action will take few minuts you will be notified if success',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.submitForm(values.description)},
            ]
          )
          }
        }
        validationSchema={yup.object().shape({
          description: yup
            .string()
            .min(2)
            .max(2000)
            .required(),
        })}
      >
        {({handleChange, values, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
          <Fragment>
            <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput, multiline && styles.textarea]}
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={() => setFieldTouched('description')}
              placeholder="Description"
            />
            {touched.description && errors.description &&
              <Text style={styles.label}>{errors.description}</Text>
            }
            </View>
            <View style={styles.inputWrapper}>
            <TouchableOpacity
                style={[styles.button, !isValid && styles.buttonDisabled]}
                disabled={!isValid}
                onPress={handleSubmit}
            >
                <Text style={styles.label}>Send demand</Text>
            </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </Formik>
  </View>
    );
  }
}

DescriptionDemandForm.propTypes = {
    labelText: PropTypes.string,
    multiline: PropTypes.bool,
};

DescriptionDemandForm.defaultProps = {
    labelText: null,
    multiline: false,
};

DescriptionDemandForm.contextTypes = {
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
