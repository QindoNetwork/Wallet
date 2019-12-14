import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import { Wallets as WalletActions } from '@common/actions';

export default class ProfilesCard extends React.Component {

    render() {
        const { onPress, group } = this.props;
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Icon name='wallet' size='large' type='ent' />
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{group.name}</Text>
                        <Text style={styles.description}>owner</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balance}>nbDemands</Text>
                            <Text style={styles.fiatBalance}>active</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: colors.white,
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
        color: colors.gray,
        fontWeight: 'bold'
    },
    description: {
        fontSize: measures.fontSizeMedium - 2,
        color: colors.gray,
    },
    balanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    balance: {
        fontSize: measures.fontSizeMedium - 1,
        color: colors.gray,
        marginLeft: measures.defaultMargin,
        fontWeight: 'bold'
    },
    fiatbalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.gray,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.lightGray
    }
});
