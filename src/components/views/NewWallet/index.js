import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export class NewWallet extends React.Component {

    static navigationOptions = { title: 'New Wallet' };

    onPressLoad() {
        const { walletName } = this.props.navigation.state.params;
        this.props.navigation.navigate('LoadMnemonics', { walletName });
    }

    onPressCreate() {
        const { walletName } = this.props.navigation.state.params;
        this.props.navigation.navigate('CreateWallet', { walletName });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.message}>Do you already have a wallet to configure?</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button onPress={() => this.onPressLoad()}>Yes, load it</Button>
                    <Button onPress={() => this.onPressCreate()}>No, create new</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        padding: measures.defaultPadding,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    buttonsContainer: {
        justifyContent: 'space-between'
    }
});
