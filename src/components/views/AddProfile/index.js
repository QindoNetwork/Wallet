import * as yup from 'yup'
import { Formik } from 'formik'
import { General as GeneralActions  } from '@common/actions';
import React, { Component, Fragment } from 'react'
import { colors, measures } from '@common/styles';
import {Keyboard, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'

export class AddProfile extends Component {

  static navigationOptions = { title: "Settings" };

  submitForm = (value1,value2) => {
    Keyboard.dismiss();
    let togethers = this.props.navigation.getParam('togethers')
    try {
      // { gasLimit: this.state.gasLimit, gasPrice: this.state.gasPrice }
      togethers.createProfile(value1,value2).then(function() {
        GeneralActions.notify("working", 'long');
        })
    } catch (e) {
        GeneralActions.notify(e.message, 'long');
    }
  }

  render() {

    return (
        <Formik
          initialValues={{ pseudo: '' }}
          onSubmit={values => {
              Alert.alert(
                'Confirm',
                'Create group ' + values.groupName + ' this action will take few minuts you will be notified if success',
              [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'OK', onPress: () => this.submitForm(values.pseudo)},
              ]
            )
            }
          }
          validationSchema={yup.object().shape({
            groupName: yup
              .number()
              .required(),
            pseudo: yup
              .string()
              .required(),
          })}
        >
          {({handleChange, values, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
            <Fragment>
              <View style={styles.container}>
              <View style={styles.body}>
                <TextInput
                  style={styles.input}
                  value={values.pseudo}
                  onChangeText={handleChange('pseudo')}
                  onBlur={() => setFieldTouched('pseudo')}
                  placeholder="New Group"
                  />
            </View>
            <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={[styles.buttonsContainer, !isValid && styles.buttonDisabled]}
                disabled={!isValid}
                color="white"
                accessibilityLabel="CREATE NEW GROUP"
                onPress={handleSubmit}>
                <Text style={styles.label}>CREATE NEW GROUP</Text>
            </TouchableOpacity>
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
