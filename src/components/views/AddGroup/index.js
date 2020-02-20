import { Button } from '@components/widgets';
import React, { Component } from 'react'
import { colors, measures } from '@common/styles';
import { View, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export class AddGroup extends Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

  render() {

    const { languages } = this.props

    return (
          <View style={styles.container}>
              <View style={styles.body}>
                <View style={styles.buttonsContainer}>
                  <Button
                    children={ LanguagesActions.label8(languages.selectedLanguage) }
                    onPress={() => this.props.navigation.navigate('CreateGroup',{ ...this.props.navigation.state.params }, { title: LanguagesActions.title7(languages.selectedLanguage) })}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                  <Button
                    children={ LanguagesActions.label9(languages.selectedLanguage) }
                    onPress={() => this.props.navigation.navigate('AskGroup',{ ...this.props.navigation.state.params }, { title: LanguagesActions.title8(languages.selectedLanguage) })}
                    />
                </View>
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
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    }
});
