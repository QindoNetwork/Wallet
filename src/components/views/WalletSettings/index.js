import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Wallets as WalletsActions, Languages as LanguagesActions } from '@common/actions';
import ListItem from './ListItem';

@inject('wallet','languages')
@observer
export class WalletSettings extends React.Component {

    async removeWallet() {
        try {
            const { wallet } = this.props;
            await WalletsActions.removeWallet(wallet.item);
            await WalletsActions.saveWallets();
            this.props.navigation.navigate('WalletsOverview', { replaceRoute: true });
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
    }

    confirmRemoveWallet() {
      const { languages } = this.props
        Alert.alert(
            LanguagesActions.label103(languages.selectedLanguage),
            LanguagesActions.label104(languages.selectedLanguage),
            [
                { text: LanguagesActions.label105(languages.selectedLanguage), onPress: () => {}, style: 'cancel' },
                { text: LanguagesActions.label106(languages.selectedLanguage), onPress: () => this.removeWallet() }
            ],
            { cancelable: false }
        );
    }

    render() {
      const { languages } = this.props
        return (
            <View style={styles.container}>
                <ListItem onPress={() => this.confirmRemoveWallet()}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='trash' />
                        </View>
                        <Text style={styles.itemTitle}>{LanguagesActions.label107(languages.selectedLanguage)}</Text>
                    </View>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('ChangePassword', { ...this.props }, { title: LanguagesActions.title10(languages.selectedLanguage) })}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='finger-print' />
                        </View>
                        <Text style={styles.itemTitle}>{LanguagesActions.label108(languages.selectedLanguage)}</Text>
                    </View>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('ChangePseudonyme', { ...this.props }, { title: LanguagesActions.title11(languages.selectedLanguage) })}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='shirt' />
                        </View>
                        <Text style={styles.itemTitle}>{LanguagesActions.label109(languages.selectedLanguage)}</Text>
                    </View>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('ChangeLanguage', { title: LanguagesActions.title9(languages.selectedLanguage) })}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='flag' />
                        </View>
                        <Text style={styles.itemTitle}>{LanguagesActions.label84(languages.selectedLanguage)}</Text>
                    </View>
                </ListItem>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        borderRadius: 10,
        height: 60
    },
    icon: {
        width: 24,
        height: 24,
        margin: measures.defaultMargin
    },
    itemTitle: {
        fontSize: measures.fontSizeMedium,
        backgroundColor: colors.grey,
    }
});
