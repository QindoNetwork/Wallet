import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { drizzleConnect } from "drizzle-react"

import styles from '../../Styles'

export default class AddProfile extends Component {

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

  }


  submitForm = (value) => {
    this.contracts["Togethers"].methods["createProfile"].cacheSend(this.props.groupID,value, {gas: 200000, gasPrice: this.props.gasPrice, from: this.props.account});
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
        initialValues={{ pseudo: ''}}
        onSubmit={values => {
            Alert.alert(
            'Confirm',
            'Add ' + values.pseudo + ' To this group? this action will take few minuts you will be notified if success',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.submitForm(values.pseudo)},
            ]
          )
          }
        }

        validationSchema={yup.object().shape({
          pseudo: yup
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
              value={values.pseudo}
              onChangeText={handleChange('pseudo')}
              onBlur={() => setFieldTouched('pseudo')}
              placeholder="pseudo"
            />
            {touched.pseudo && errors.pseudo &&
              <Text style={styles.label}>{errors.pseudo}</Text>
            }
            </View>
            <View style={styles.inputWrapper}>
            <TouchableOpacity
                style={[styles.button, !isValid && styles.buttonDisabled]}
                disabled={!isValid}
                onPress={handleSubmit}
            >
                <Text style={styles.label}>Add Profile</Text>
            </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </Formik>
  </View>
    );
  }
}

AddProfile.propTypes = {
    labelText: PropTypes.string,
    multiline: PropTypes.bool,
};

AddProfile.defaultProps = {
    labelText: null,
    multiline: false,
};

AddProfile.contextTypes = {
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
