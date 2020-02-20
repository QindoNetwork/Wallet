import * as yup from 'yup'
import { Formik } from 'formik'
import { General as GeneralActions, Languages as LanguagesActions } from '@common/actions';
import { Button } from '@components/widgets';
import React, { Component, Fragment } from 'react'
import { colors, measures } from '@common/styles';
import {Keyboard, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react';
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';
import { SecureTransaction } from '@components/widgets';

@inject('wallet','languages')
@observer
export class OpenDemand extends Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

  state = { show: false };

  renderModal(description) {

    const { gasParam, togethers, groupID } = this.props.navigation.state.params;

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{groupID,description}}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gas.askForFunds}/> )
    }
  }

  render() {
    const { languages } = this.props;
    return (
        <Formik
          initialValues={{ description: '' }}
          onSubmit={() => this.setState({ show: true })}
          validationSchema={yup.object().shape({
            description: yup
              .string()
              .min(restrictions.minDescription)
              .max(restrictions.maxDescription)
              .required(),
          })}
        >
          {({handleChange, values, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
            <Fragment>
              <View style={styles.container}>
              <View style={styles.body}>
                <TextInput
                  style={styles.input}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={() => setFieldTouched('description')}
                  placeholder={LanguagesActions.label61(languages.selectedLanguage)}
                  multiline="true"
                  />
                  </View>
                  <View style={styles.buttonsContainer}>
                      <Button
                          children={LanguagesActions.label62(languages.selectedLanguage)}
                          disabled={!isValid}
                          onPress={handleSubmit}/>
                  </View>
                  {this.renderModal(values.description)}
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
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    }
});
