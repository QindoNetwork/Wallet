import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
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
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Icon name='wallet' size='large' type='ent' />
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{wallet.name}</Text>
                        <Text style={styles.description}>{wallet.description}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: colors.black,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: measures.defaultPadding,
        marginBottom: measures.defaultMargin,
        height: 70
    },
    leftColumn: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    middleColumn: {
        flex: 2
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    title: {
        fontSize: measures.fontSizeMedium,
        color: colors.white,
        fontWeight: 'bold'
    },
    description: {
        fontSize: measures.fontSizeMedium - 2,
        color: colors.white,
    },
    balanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    balance: {
        fontSize: measures.fontSizeMedium - 1,
        color: colors.white,
        marginLeft: measures.defaultMargin,
        fontWeight: 'bold'
    },
    fiatbalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.white,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.lightGray
    }
});
