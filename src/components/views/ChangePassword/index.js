import React, { Fragment } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Languages as LanguagesActions  } from '@common/actions';
import { Gas as gas, Restrictions as restrictions } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
import * as yup from 'yup'
import { Formik } from 'formik'

import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class ChangePassword extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    state = { show: false };

    renderModal(value) {

      const { gasParam, togethers  } = this.props.navigation.state.params;

      if (this.state.show === true) {
      return (  <SecureTransaction
            togethers={togethers}
            values={{value,oldPassword}}
            gasParam={gasParam}
            navigation={this.props.navigation}
            type={gas.changePassword}/> )
      }
    }


    render() {

      const { languages } = this.props

      return (
        <Formik
          initialValues={{ password1: '', password2: '', oldPassword: '' }}
          onSubmit={() => this.setState({ show: true })}
          validationSchema={yup.object().shape({
            oldPassword: yup
              .string()
              .min(restrictions.minPassword)
              .max(restrictions.maxPassword)
              .required('Required'),
              password1: yup
                .string()
                .min(restrictions.minPassword)
                .max(restrictions.maxPassword)
                .required('Required'),
                password2: yup
                  .string()
                  .min(restrictions.minPassword)
                  .max(restrictions.maxPassword)
                  .required('Required')
          })}
        >
          {({handleChange, values, errors, isValid, handleSubmit}) => (
            <Fragment>
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.message}>{ LanguagesActions.label16(languages.selectedLanguage) }</Text>
            <TextInput
              style={styles.input}
              value={values.oldPassword}
              onChangeText={handleChange('oldPassword')}
              secureTextEntry
              placeholder={ LanguagesActions.label16(languages.selectedLanguage) }
              />
            <Text style={styles.message}>{ LanguagesActions.label18(languages.selectedLanguage) }</Text>
            <TextInput
              style={styles.input}
              value={values.password1}
              secureTextEntry
              onChangeText={handleChange('password1')}
              placeholder={ LanguagesActions.label17(languages.selectedLanguage) }
              />
            <Text style={styles.message}>{ LanguagesActions.label19(languages.selectedLanguage) }</Text>
            <TextInput
              style={styles.input}
              value={values.password2}
              secureTextEntry
              onChangeText={handleChange('password2')}
              placeholder={ LanguagesActions.label17(languages.selectedLanguage) }
              />
          </View>
      <View style={styles.buttonsContainer}>
          <Button
              children="Next"
              disabled={!isValid}
              onPress={handleSubmit}/>
      </View>
      {this.renderModal(values.password1,values.oldPassword)}
  </View>
  </Fragment>
)}
</Formik>
  )
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
