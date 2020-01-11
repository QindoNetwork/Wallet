import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import { Wallets as WalletActions } from '@common/actions';
import { Image as ImageUtils } from '@common/utils';

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
                    </View>
                    <View style={styles.rightColumn}>
                    <Image style={styles.avatar}
                        source={{ uri: ImageUtils.generateAvatar(wallet.address,50) }} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: colors.lightGray,
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
        color: colors.darkGray
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
        color: colors.darkGray
    },
    description: {
        fontSize: measures.fontSizeLarge - 2,
        color: colors.darkGray
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
    },
    avatar: {
        backgroundColor: colors.white,
        width: 100,
        height: 100
    }
});
