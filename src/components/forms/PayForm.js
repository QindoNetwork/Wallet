import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react'
import {View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { drizzleConnect } from "drizzle-react"

import styles from '../../Styles'

class PayForm extends Component {

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey : null,
    };
  }

  componentDidMount() {

    if(this.props.family == 1){
      this.setState({
      dataKey: this.contracts[this.props.name].methods["balanceOf"].cacheCall(this.props.account),
      })
    }
  }

  submitForm = (value1) => {
    return (this.props.navigation.navigate('ConfirmPaymentScreen',
        {
        target: this.props.target,
        groupID: this.props.groupID,
        value: value1,
        type: "1",
        crypto: this.props.crypto,
        account: this.props.account,
        gasPrice: this.props.gasPrice,
      }))
    }

  render() {

    if(this.props.family == 1){
      if (
      !(
        this.state.dataKey in
        this.props.contracts[this.props.name]["balanceOf"]
      )
    ) {
      return <ActivityIndicator size="large" color="#0000ff" />
    }
}

      const { labelText, multiline, ...inputProps } = this.props;

      let currentBalance

      if(this.props.family == 0){
        currentBalance = this.props.balance
        }
        else{
        currentBalance = this.props.contracts[this.props.name]["balanceOf"][this.state.dataKey].value;
        }

    return (
      <View style={styles.inputWrapper}>
      <Formik
        initialValues={{ amount: '' }}

        onSubmit={values => {
            Alert.alert(
              'Confirm',
              'Give ' + values.amount + ' units, this action will take few minuts you will be notified if success',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.submitForm(values.amount)},
            ]
          )
          }
        }

        validationSchema={yup.object().shape({
          amount: yup
            .number()
            .min(0.000000001)
            .max(currentBalance)
            .required()
            .positive()
        })}
      >
        {({handleChange, values, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
          <Fragment>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput, multiline && styles.textarea]}
              value={values.amount}
              onChangeText={handleChange('amount')}
              onBlur={() => setFieldTouched('amount')}
              placeholder="Montant"
            />
            {touched.amount && errors.amount &&
              <Text style={styles.label}>{errors.amount}</Text>
            }
            <TouchableOpacity
                style={[styles.button, !isValid && styles.buttonDisabled]}
                disabled={!isValid}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            <Text style={styles.label}>your balance</Text>
            <Text style={styles.label}>{currentBalance}</Text>
            </View>
          </Fragment>
        )}
      </Formik>
  </View>
    );
  }
}

PayForm.propTypes = {
    labelText: PropTypes.string,
    multiline: PropTypes.bool,
};

PayForm.defaultProps = {
    labelText: null,
    multiline: false,
};

PayForm.contextTypes = {
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


export default drizzleConnect(PayForm, mapStateToProps);
