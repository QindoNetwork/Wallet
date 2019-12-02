import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';

export class NewWalletName extends React.Component {

    static navigationOptions = { title: 'New Wallet Name' };

    state = { walletName: '', walletDescription: '', password1: '', password2: '' };

    onPressContinue() {
        Keyboard.dismiss();
        const { walletName, walletDescription, password1, password2 } = this.state;
        if (!walletName && !pseudonyme && password1 === password2) return;
        this.props.navigation.navigate('NewWallet', { walletName, walletDescription, password1, password2 });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.message}>Give a name to the new wallet</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex.: Vacations fund"
                        underlineColorAndroid="transparent"
                        onChangeText={walletName => this.setState({ walletName })} />
                    <Text style={styles.message}>Give a description too (optional)</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Ex.: For spending during next vacations"
                        onChangeText={walletDescription => this.setState({ walletDescription })} />
                    <Text style={styles.message}>Password</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        onChangeText={password1 => this.setState({ password1 })} />
                    <Text style={styles.message}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        onChangeText={password2 => this.setState({ password2 })} />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        children="Next"
                        onPress={() => this.onPressContinue()} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    },
    input: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    }
});
