import React from 'react';
import { Alert, TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Button } from '@components/widgets';

export default class Case4 extends React.Component {

    render() {
      const { navigation, groupID, togethers, address, ERC20s, gasParam, profiles, owner } = this.props
      const EthPrice = (gasParam[6].price * gasParam[6].limit) / 1000000000
      const EthPrice2 = (gasParam[8].price * gasParam[8].limit) / 1000000000

      return
      (
        <View style={styles.container}>
        <View style={styles.buttonsContainer}>
            <Button
              children="Ask for funds"
              onPress={() => navigation.navigate('AskForFunds',{ groupID, item, togethers, address, ERC20s, gasParam })}/>
        </View>
          <FlatList
              data={profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
              renderItem={({ item }) => (
                <TouchableOpacity
                style={styles.content}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ProfileData',{ groupID, owner, item, togethers, address, ERC20s, gasParam })
                }>
                  <ProfileCard profile={item} groupID={groupID} togethers={togethers}/>
                </TouchableOpacity>
              )}
          />
            </View>
        )
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
    content: {
        marginTop: measures.defaultMargin
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
