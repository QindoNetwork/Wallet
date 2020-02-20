import * as yup from 'yup'
import { Formik } from 'formik'
import React, { Component, Fragment } from 'react'
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Gas as gas } from '@common/constants';
import { View, StyleSheet, TextInput, Text } from 'react-native'
import { SecureTransaction } from '@components/widgets';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export class AskGroup extends Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

  state = { show: false };

  renderModal(groupID) {

    const { gasParam, togethers  } = this.props.navigation.state.params;

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{groupID}}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gas.ask}/> )
    }
  }

  render() {

    const { languages } = this.props

    return (
        <Formik
          initialValues={{ groupID: '' }}
          onSubmit={() => this.setState({ show: true })}
          validationSchema={yup.object().shape({
            groupID: yup
              .number()
              .required(),
          })}
        >
          {({handleChange, values, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
            <Fragment>
              <View style={styles.container}>
              <View style={styles.body}>
                <TextInput
                  style={styles.input}
                  value={values.groupID}
                  onChangeText={handleChange('groupID')}
                  onBlur={() => setFieldTouched('groupID')}
                  placeholder={ LanguagesActions.label14(languages.selectedLanguage) }
                  />
            <View style={styles.buttonsContainer}>
                <Button
                    children={ LanguagesActions.label15(languages.selectedLanguage) }
                    disabled={!isValid}
                    onPress={handleSubmit}/>
            </View>
            </View>
            {this.renderModal(values.groupID)}
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
    input: {
        width: '90%',
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    }
});
