import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@components/widgets';
import { Wallet as WalletUtils } from '@common/utils';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Wallets as WalletsActions, Languages as LanguagesActions } from '@common/actions';
import ConfirmBox from './ConfirmBox';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class ConfirmMnemonics extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    state = { mnemonics: [] };

    componentDidMount() {
        const { mnemonics, walletName } = this.props.navigation.state.params;
        this.setState({ mnemonics, walletName });
    }

    async onPressConfirm() {
        if (this.refs.confirm.isValidSequence()) {
          try {
            const { mnemonics, walletName } = this.state;
            const m = mnemonics.join(' ');
            const wallet = WalletUtils.loadWalletFromMnemonics(m);
            await WalletsActions.addWallet(walletName, wallet, m);
            this.props.navigation.navigate('WalletsOverview', { replaceRoute: true });
            await WalletsActions.saveWallets();
          } catch (e) {
            GeneralActions.notify(e.message, 'long');
          }
        } else GeneralActions.notify(LanguagesActions.label24(languages.selectedLanguage), 'long');
    }

    render() {
      const { languages } = this.props
        return (
            <View style={styles.container}>
                <View />
                <ConfirmBox ref='confirm' mnemonics={this.state.mnemonics} />
                <View style={styles.buttonsContainer}>
                    <Button onPress={() =>this.onPressConfirm()}>{LanguagesActions.label146(languages.selectedLanguage)}</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: colors.defaultBackground
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    mnemonicsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '80%'
    },
    mnemonic: {
        margin: 4
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        height: 104
    }
});
