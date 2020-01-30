import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Wallets as WalletsActions } from '@common/actions';
import ListItem from './ListItem';
import Header from './Header';

@inject('wallet')
@observer
export class WalletSettings extends React.Component {

    async removeWallet() {
        try {
            const { wallet } = this.props;
            await WalletsActions.removeWallet(wallet.item);
            this.props.navigation.goBack();
            await WalletsActions.saveWallets();
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
    }

    showPK() {
        const { wallet } = this.props;
        this.props.navigation.push('ShowPrivateKey', { wallet });
    }

    confirmRemoveWallet() {
        Alert.alert(
            'Remove wallet',
            'This action cannot be undone. Are you sure?',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                { text: 'Remove', onPress: () => this.removeWallet() }
            ],
            { cancelable: false }
        );
    }

    confirmExportPK() {
        Alert.alert(
            'Export private key',
            'Make sure you are alone and no one else will see your private key.',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                { text: 'Continue', onPress: () => this.showPK() }
            ],
            { cancelable: false }
        );
    }

    render() {
        return (
            <View style={styles.container}>
            <Header/>
                <ListItem onPress={() => this.confirmRemoveWallet()}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='trash' />
                        </View>
                        <Text style={styles.itemTitle}>Remove wallet</Text>
                    </View>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('WalletsOverview', { replaceRoute: true })}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='wallet' type='ent' />
                        </View>
                        <Text style={styles.itemTitle}>Wallets</Text>
                    </View>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('ChangePassword', { ...this.props })}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='finger-print' />
                        </View>
                        <Text style={styles.itemTitle}>Password</Text>
                    </View>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('ChangePseudonyme', { ...this.props })}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='shirt' />
                        </View>
                        <Text style={styles.itemTitle}>User name</Text>
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
