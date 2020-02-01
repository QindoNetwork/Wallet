import React, { Fragment } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Gas as gas, Restrictions as restrictions } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
import * as yup from 'yup'
import { Formik } from 'formik'

export class ChangePseudonyme extends React.Component {

    static navigationOptions = { title: 'Change pseudonyme' };

    state = { show: false };

    renderModal(value) {

      const { gasParam, togethers } = this.props.navigation.state.params;

      if (this.state.show === true) {
      return (  <SecureTransaction
            togethers={togethers}
            values={{value}}
            gasParam={gasParam}
            navigation={this.props.navigation}
            type={gas.changeUserName}/> )
      }
    }

    render() {

      return (
        <Formik
          initialValues={{ userName: '' }}
          onSubmit={() => this.setState({ show: true })}
          validationSchema={yup.object().shape({
            userName: yup
              .string()
              .min(restrictions.minPseudonyme)
              .max(restrictions.maxPseudonyme)
              .required('Required')
          })}
        >
          {({handleChange, values, errors, isValid, handleSubmit}) => (
            <Fragment>
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.message}>New user name</Text>
            <TextInput
              style={styles.input}
              value={values.userName}
              onChangeText={handleChange('userName')}
              placeholder="new name"
              />
          </View>
      <View style={styles.buttonsContainer}>
          <Button
              children="Next"
              disabled={!isValid}
              onPress={handleSubmit}/>
      </View>
        {this.renderModal(values.userName)}
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
