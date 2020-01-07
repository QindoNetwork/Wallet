import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import { Wallets as WalletActions } from '@common/actions';

@inject('prices')
@observer
export default class WalletCard extends React.Component {

    get balance() {
        if (!this.props.wallet.balance) return 0;
        return Number(WalletUtils.formatBalance(this.props.wallet.balance));
    }

    get fiatLabel() {
        return this.props.prices.selectedRate.toUpperCase();
    }

    get fiatBalance() {
        return Number(this.props.prices.usd * this.balance);
    }

    componentDidMount() {
        WalletActions.updateBalance(this.props.wallet);
    }

    render() {
        const { onPress, wallet } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                <View style={styles.leftColumn}>
                <Icon name='wallet' size='large' type='ent' color='white' />
                </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{wallet.name}</Text>
                        <Text style={styles.description}>{wallet.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: blue,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: measures.defaultPadding,
        marginBottom: measures.defaultMargin,
        height: 150
    },
    leftColumn: {
        flex: 1,
        justifyContent: 'center',
        color: colors.lightGray
    },
    middleColumn: {
        flex: 2,
        justifyContent: 'center',
        color: colors.white
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        color: colors.white
    },
    title: {
        fontSize: measures.fontSizeLarge,
        color: colors.darkGray,
        fontWeight: 'bold',
        color: colors.white
    },
    description: {
        fontSize: measures.fontSizeLarge - 2,
        color: colors.white
    },
    balanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    balance: {
        fontSize: measures.fontSizeLarge - 1,
        color: colors.darkGray,
        marginLeft: measures.defaultMargin,
        fontWeight: 'bold'
    },
    fiatbalance: {
        fontSize: measures.fontSizeLarge - 3,
        color: colors.grey,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.lightGray
    }
});
