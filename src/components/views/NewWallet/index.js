import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export class NewWallet extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    onPressLoad() {
      const { languages } = this.props
        const { walletName } = this.props.navigation.state.params;
        this.props.navigation.navigate('LoadMnemonics', { walletName, title: LanguagesActions.title17(languages.selectedLanguage) });
    }

    onPressCreate() {
      const { languages } = this.props
        const { walletName } = this.props.navigation.state.params;
        this.props.navigation.navigate('CreateWallet', { walletName, title: LanguagesActions.title18(languages.selectedLanguage) });
    }

    render() {
      const { languages } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.message}>{LanguagesActions.label54(languages.selectedLanguage)}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button onPress={() => this.onPressLoad()}>{LanguagesActions.label55(languages.selectedLanguage)}</Button>
                    <Button onPress={() => this.onPressCreate()}>{LanguagesActions.label56(languages.selectedLanguage)}</Button>
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
