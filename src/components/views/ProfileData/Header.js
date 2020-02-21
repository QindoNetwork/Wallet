import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export default class Header extends React.Component {

    render() {

      const { languages } = this.props;

      if (this.props.type === '1'){

        return(

          <View style={styles.container}>
              <View style={styles.leftColumn}>
                  <Text style={styles.title}>{LanguagesActions.label63(languages.selectedLanguage)}</Text>
              </View>
              <View style={styles.rightColumn}>
                  <Text style={styles.balance}>{LanguagesActions.label64(languages.selectedLanguage)}</Text>
              </View>
          </View>

      )

      }

      if (this.props.type === '3'){

        return(

          <View style={styles.container}>
              <View style={styles.leftColumn}>
                  <Text style={styles.title}>{LanguagesActions.label147(languages.selectedLanguage)}</Text>
              </View>
              <View style={styles.rightColumn}>
                  <Text style={styles.balance}>{LanguagesActions.label148(languages.selectedLanguage)}</Text>
              </View>
          </View>

      )}

      if (this.props.type === '2'){

        return(

          <View style={styles.container}>
              <View style={styles.leftColumn}>
                  <Text style={styles.title}>{LanguagesActions.label149(languages.selectedLanguage)}</Text>
              </View>
              <View style={styles.rightColumn}>
                  <Text style={styles.balance}>{LanguagesActions.label150(languages.selectedLanguage)}</Text>
              </View>
          </View>

      )

      }

        return (
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <Text style={styles.title}>{LanguagesActions.label151(languages.selectedLanguage)}</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.balance}>{LanguagesActions.label152(languages.selectedLanguage)}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray
    },
    leftColumn: {
        flex: 1
    },
    title: {
        fontSize: measures.fontSizeLarge,
        color: colors.black
    },
    balance: {
        fontSize: measures.fontSizeMedium + 2,
        fontWeight: 'bold',
        color: colors.black
    },
    fiatBalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.black
    },
    rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
});
