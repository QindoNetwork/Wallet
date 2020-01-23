import React, { Fragment } from 'react'
import { Clipboard, Share, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions } from '@common/actions';
import { inject, observer } from 'mobx-react';
import QRCode from 'react-native-qrcode-svg';
import { Gas as gas, Restrictions as restrictions } from '@common/constants';
import { Icon } from '@components/widgets';
import { Wallet as WalletUtils } from '@common/utils';
import * as yup from 'yup'
import { Formik } from 'formik'
import { sha256 } from 'react-native-sha256';
import { SecureTransaction } from '@components/widgets';

@inject('wallet')
@observer
export class Login extends React.Component {

    static navigationOptions = { title: 'Login' };

    state = { show: false, loading: 0, registered: 0, password: '', result: 0, pseudo: '' };

    copyToClipboard() {
        const { item } = this.props.wallet;
        Clipboard.setString(item.address);
        GeneralActions.notify('Copied to clipboard', 'short');
    }

    share() {
        const { item } = this.props.wallet;
        Share.share({
            title: 'Wallet address:',
            message: item.address
        });
    }

    renderColumn = (icon, label, action) => (
        <TouchableWithoutFeedback onPress={action}>
            <View style={styles.actionColumn}>
                <Icon name={icon} style={styles.actionIcon} />
                <Text style={styles.actionLabel}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    renderModal(pseudo,password1,password2) {

      const { gasParam, togethers, address } = this.props.navigation.state.params;

      if (this.state.show === true) {
      return (  <SecureTransaction
            togethers={togethers}
            values={{pseudo,password1,password2}}
            address={address}
            gasParam={gasParam}
            navigation={this.props.navigation}
            type={gas.setUser}/> )
      }
    }

    async onPressContinueLogin() {
        Keyboard.dismiss();
        const { gasParam, togethers, address } = this.props.navigation.state.params;
        const { password } = this.state;
        const hashPassword = sha256(password)
        try {
          this.setState({
                          result : parseInt (await this.props.navigation.getParam('togethers').connectUser(hashPassword),10)
                        })
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
        if (this.state.result === 1) {
          this.props.navigation.navigate('WalletDetails', { gasParam, address, togethers, replaceRoute: true });
        }
        else {
          GeneralActions.notify("Password not good", 'long');
        }
    }

    async componentDidMount() {

      const { togethers, address } = this.props.navigation.state.params;

      try {
        this.setState({
                        pseudo : await togethers.mappAddressToUser(address),
                        registered: parseInt (await togethers.verifyRegistration(),10),
                        loading: 1
                      })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    renderLogin() {

        return ( <View style={styles.container}>
          <View style={styles.body}>
              <Text style={styles.message}>Welcome {this.state.pseudo}</Text>
              <Text style={styles.message}>Password</Text>
              <TextInput
                  style={styles.input}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={password => this.setState({ password })} />
          </View>
          <View style={styles.buttonsContainer}>
              <Button
                  children="Next"
                  onPress={() => this.onPressContinueLogin()}/>
          </View>
      </View>)
    }

    renderNewWallet() {
      return (
        <Formik
          initialValues={{ password1: '', password2: '', pseudo: '' }}
          onSubmit={() => this.setState({ show: true })}
          validationSchema={yup.object().shape({
            password1: yup
              .string()
              .min(restrictions.minPassword)
              .max(restrictions.maxPassword)
              .required('Required'),
            password2: yup
              .string()
              .required('Required'),
            pseudo: yup
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
            <Text style={styles.message}>Choose a pseudonyme</Text>
            <TextInput
              style={styles.input}
              value={values.pseudo}
              onChangeText={handleChange('pseudo')}
              placeholder="pseudo"
              />
            <Text style={styles.message}>Password</Text>
            <TextInput
              style={styles.input}
              value={values.password1}
              secureTextEntry
              onChangeText={handleChange('password1')}
              placeholder="password"
              />
            <Text style={styles.message}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={values.password2}
              secureTextEntry
              onChangeText={handleChange('password2')}
              placeholder="password"
              />
          </View>
      <View style={styles.buttonsContainer}>
          <Button
              children="Next"
              disabled={!isValid}
              onPress={handleSubmit}/>
      </View>
      {this.renderModal(values.pseudo,values.password1,values.password2)}
  </View>
  </Fragment>
)}
</Formik>
  )
}

    renderWalletEmpty() {
      const { address } = this.props.navigation.state.params;
      return (
        <View style={styles.container}>
        <Text style={styles.centered}>Low balance, you need ether to register, show the code below to receive ethers and enter to the community!</Text>
        <View style={styles.centered}>
            <QRCode size={256} value={address} />
        </View>
          <View style={styles.actions}>
              <View style={styles.actionsBar}>
                  {this.renderColumn('copy', 'Copy', () => this.copyToClipboard())}
                  {this.renderColumn('share', 'Share', () => this.share())}
              </View>
          </View>
      </View>
      )
    }


    render() {

      const balance = Number(WalletUtils.formatBalance(this.props.wallet.item.balance))

      if(this.state.loading === 0)
      {
        return (
        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>
        );
      }

      if(this.state.registered === 1)
      {
        return (
                this.renderLogin()
        );
      }

      if(balance > 0)
      {
        return (
          this.renderNewWallet()
        );
      }

        return (
                this.renderWalletEmpty()
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
