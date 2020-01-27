import React, { Fragment } from 'react'
import { Clipboard, Share, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from '@components/widgets';
import { Wallet as WalletUtils } from '@common/utils';
import * as yup from 'yup'
import { Formik } from 'formik'
import { inject, observer } from 'mobx-react';
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
@inject('prices', 'wallet')
@observer

export class ChangePseudonyme extends React.Component {

    static navigationOptions = { title: 'Change pseudonyme' };

    state = { show: false };

    renderModal(value) {

      const { gasParam, togethers, erc20s, address  } = this.props.navigation.state.params;
      const limit = gasParam[gas.changeUserName].limit
      const price = gasParam[gas.changeUserName].price

      if (this.state.show === true) {
      return (  <SecureTransaction
            togethers={togethers}
            values={{value}}
            limit={limit}
            price={price}
            erc20s={erc20s}
            address={address}
            gasParam={gasParam}
            navigation={this.props.navigation}
            type={gas.changeUserName}/> )
      }
    }

    render() {

      return (
        <Formik
          initialValues={{ pseudo: '' }}
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
    actions: {
        height: 56
    },
    actionsBar: {
        flexDirection: 'row',
        flex: 3
    },
    actionColumn: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered: {
        alignSelf: 'center'
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
