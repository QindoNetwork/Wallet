import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Button, Camera, InputWithIcon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import Recents from './Recents';
import { General as GeneralActions  } from '@common/actions';

export class SelectDestination extends React.Component {

    static navigationOptions = { title: 'Select destination' };

    state = { address: '' };

    async onPressContinue() {

        const { navigation } = this.props
        const amount = navigation.getParam('amount')
        const gasParam = navigation.getParam('gasParam')
        const from = navigation.getParam('address')
        const erc20s = navigation.getParam('erc20s')
        const control = navigation.getParam('control')
        const togethers = navigation.getParam('togethers')
        const max = navigation.getParam('max')
        const address = this.state.address

        try {
          if (1 === 2) {
            let overrides = {
                gasLimit: this.props.navigation.getParam('gasParam')[11].limit,
                gasPrice: this.props.navigation.getParam('gasParam')[11].price * 1000000000,
                //nonce: 123,
                //value: utils.parseEther('1.0'),
                };
          //  await this.props.navigation.getParam('togethers').payForFunds(pseudo, 1, overrides);
            GeneralActions.notify('Wait for validation', 'long');
          }
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
      //  navigation.navigate('WalletDetails', { max, gasParam, address, erc20s, control, togethers, replaceRoute: true });
      this.props.navigation.navigate('ConfirmTransaction', { address, amount });

    }

    render() {
        return (
            <View style={styles.container}>
                <InputWithIcon
                    ref="input"
                    autoFocus
                    icon="qr-scanner"
                    placeholder="Destination address"
                    onChangeText={(address) => this.setState({ address })}
                    onPressIcon={() => this.refs.camera.show()} />
                <Button children="Continue" onPress={() =>this.onPressContinue()} />
                <Camera
                    ref="camera"
                    modal
                    onClose={() => this.refs.camera.hide()}
                    onBarCodeRead={address => this.refs.input.onChangeText(address)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        padding: measures.defaultPadding
    },
    content: {
        flex: 1,
        alignItems: 'stretch',
        marginVertical: measures.defaultMargin
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
