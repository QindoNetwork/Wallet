import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions, General as GeneralActions } from '@common/actions';

@inject('languages')
@observer
export class NewWalletName extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    state = { walletName: '' };

    onPressContinue() {
      const { languages } = this.props;
        Keyboard.dismiss();
        const { walletName } = this.state;
        if (!walletName) return;
        try {
            this.props.navigation.navigate('NewWallet', { walletName, title: LanguagesActions.title19(languages.selectedLanguage) })
          } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
    }

    render() {
      const { languages } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.message}>{LanguagesActions.label58(languages.selectedLanguage)}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={LanguagesActions.label59(languages.selectedLanguage)}
                        underlineColorAndroid="transparent"
                        onChangeText={walletName => this.setState({ walletName })} />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        children={LanguagesActions.label60(languages.selectedLanguage)}
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
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    }
});
