import React from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, InputWithIcon, TextBullet } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import { General as GeneralActions, Wallets as WalletsActions, Languages as LanguagesActions, Contracts as ContractsActions } from '@common/actions';
import { inject, observer } from 'mobx-react';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { TogethersABI as togethersABI } from '@common/ABIs';
import { ethers } from 'ethers';

@inject('languages')
@observer
export class LoadMnemonics extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    state = { mnemonics: [] };

    async createWallet(mnemonics, walletName) {
      const { languages } = this.props
      try {
      const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics);
            const { walletName } = this.props.navigation.state.params;
            await WalletsActions.addWallet(walletName, wallet, mnemonics);
            this.props.navigation.navigate('WalletsOverview', { replaceRoute: true });
            await WalletsActions.saveWallets();
            GeneralActions.notify(LanguagesActions.label40(languages.selectedLanguage), 'long');
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
    }

    async onPressOpenWallet() {
      const { languages } = this.props
        if (!this.state.mnemonics.length) return;
        Keyboard.dismiss();
        try {
            const { mnemonics } = this.state;
            const m = mnemonics.join(' ');
            const connection = ethers.Wallet.fromMnemonic(m.toString()).connect(EthereumNetworks.fallbackProvider);
            const contract = new ethers.Contract(contractsAddress.togethersAddress, togethersABI, connection);
            var { walletName } = this.props.navigation.state.params;
            if (parseInt(await contract.verifyRegistration(),10) === 0 )
            {
              if (parseInt(await contract.verifyUserAvailability(walletName),10) === 0 )
              {
                GeneralActions.notify(LanguagesActions.label57(languages.selectedLanguage), 'long')
              }
              else
              {
                this.createWallet(m,walletName)
              }
            }
            else
            {
              const wallet = WalletUtils.loadWalletFromMnemonics(m);
              walletName = await contract.mappAddressToUser(wallet.address)
              this.createWallet(m,walletName)
            }
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
    }

    removeMnemonic(mnemonic) {
        let { mnemonics } = this.state;
        mnemonics = mnemonics.filter(m => m !== mnemonic);
        this.setState({ mnemonics });
    }

    renderMnemonic = (mnemonic, index) => (
        <TouchableWithoutFeedback key={index} onPress={() => this.removeMnemonic(mnemonic)}>
            <View style={styles.mnemonic}>
                <TextBullet>{mnemonic}</TextBullet>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
      const { languages } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.message}>Type the mnemonics</Text>
                    <View style={styles.mnemonics}>
                        {this.state.mnemonics.map(this.renderMnemonic)}
                    </View>
                    <InputWithIcon
                        icon='send'
                        placeholder={LanguagesActions.label41(languages.selectedLanguage)}
                        onPressIcon={text => this.setState({ mnemonics: this.state.mnemonics.concat([text]) })} />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        children={LanguagesActions.label42(languages.selectedLanguage)}
                        onPress={() => this.onPressOpenWallet()} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: colors.defaultBackground
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    logo: {
        width: 128,
        height: 128,
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    },
    mnemonics: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 4
    },
    mnemonic: {
        margin: 4
    }
});
