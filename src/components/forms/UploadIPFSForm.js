import * as yup from 'yup'
import { Formik } from 'formik'
import React, { Component, Fragment } from 'react'
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { drizzleConnect } from "drizzle-react"
import styles from '../../Styles'

export default class UploadIPFSForm extends Component {

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts
  }

  render() {

    const { labelText, multiline, ...inputProps } = this.props;

    return (
      <Formik
        initialValues={{ url: '' }}
        validationSchema={yup.object().shape({
          url: yup
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
            value={values.userName}
            onChangeText={handleChange('url')}
            onBlur={() => setFieldTouched('url')}
            placeholder="url"
          />
          </View>
          <View style={styles.inputWrapper}>
          <TouchableOpacity
              style={[styles.button, !isValid && styles.buttonDisabled]}
              disabled={!isValid}
              onPress={() => this.props.navigation.navigate('RegisterNewUserScreen',
              {
                name: this.props.name,
                ipfs: values.url,
                gasPrice: this.props.gasPrice,
                account: this.props.account,
                gasPrice: this.props.gasPrice,
                languageKey: this.props.languageKey,
                })
              }>
              <Text style={styles.label}>NEXT</Text>
          </TouchableOpacity>
          </View>
          </Fragment>
        )}
      </Formik>

    );
  }
}

UploadIPFSForm.propTypes = {
    labelText: PropTypes.string,
    multiline: PropTypes.bool,
};

UploadIPFSForm.defaultProps = {
    labelText: null,
    multiline: false,
};

UploadIPFSForm.contextTypes = {
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
