import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions, General as GeneralActions } from '@common/actions';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { TogethersABI as togethersABI } from '@common/ABIs';

@inject('languages')
@observer
export class NewWalletName extends React.Component {

    static navigationOptions = { title: 'New Wallet Name' };

    state = { walletName: '' };

    async onPressContinue() {
        Keyboard.dismiss();
        const { walletName } = this.state;
        if (!walletName) return;
        const contract = new ethers.Contract(contractsAddress.togethersAddress, togethersABI, EthereumNetworks.fallbackProvider);
        if (parseInt(await contract.verifyUserAvailability(value),10) === 0 )
        {
          result = "KO"
          GeneralActions.notify('Username unavailable', 'long');
        }
        else
        {
          this.props.navigation.navigate('NewWallet', { walletName });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.message}>Choose your pseudonyme</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Wallet name"
                        underlineColorAndroid="transparent"
                        onChangeText={walletName => this.setState({ walletName })} />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        children="Next"
                        onPress={() => this.onPressContinue()} />
                </View>
            </View>
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
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    }
});
