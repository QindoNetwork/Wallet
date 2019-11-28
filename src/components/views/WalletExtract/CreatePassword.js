import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { measures } from '@common/styles';
import { Wallets as WalletActions } from '@common/actions';
import Balance from './Balance';
import TransactionCard from './TransactionCard';
import NoTransactions from './NoTransactions';
import { GeneralActions } from '@common/actions';
import { Control as ControlInstance } from '@common/functions';

@inject('wallet')
@observer
export class CreatePassword extends React.Component {

    render() {
      
        return (
            <View style={styles.container}>

                <Text>CreatePassword</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flex: 1,
        padding: measures.defaultPadding
    },
    content: {
        marginTop: measures.defaultMargin
    }
});
