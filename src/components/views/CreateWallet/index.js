import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export class CreateWallet extends React.Component {

    static navigationOptions = { title: 'Create Wallet' };

    onPressProceed() {
        const { walletName } = this.props.navigation.state.params;
        this.props.navigation.navigate('CreateMnemonics', { walletName });
    }

    render() {
      const { languages } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.message}>{LanguagesActions.label35(languages.selectedLanguage)}</Text>
                        <Text style={styles.message}>{LanguagesActions.label36(languages.selectedLanguage)}</Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button onPress={() => this.onPressProceed()}>{LanguagesActions.label37(languages.selectedLanguage)}</Button>
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
