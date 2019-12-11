import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { HeaderIcon } from '@components/widgets';
import { Contracts, General as GeneralActions, Wallets as WalletActions  } from '@common/actions';

export class Groups extends React.Component {

    state = {loading: 0, groupIDs: [], groupNames: [] };

    async componentDidMount() {
      const { mnemonics, address } = this.props
      try {
        let keys = []
        let names = []
        let length = parseInt (await Contracts.getGroupsLength(address),10)

        if ( length !== 0 ) {
          for ( var i = 0; i < length; i++ ) {
            keys.push( parseInt (await Contracts.TogethersInstance(mnemonics).getGroupID(i, { from : address }),10))
            names.push(await Contracts.TogethersInstance(mnemonics).getGroup(i, { from : address }))
          }
          this.setState({
                        groupIDs : keys,
                        groupNames : names,
                        loading: 1
                      })
        }
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    render() {

      const { mnemonics, address, navigation } = this.props

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>

      )

      }

      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.message}>test</Text>
            <View style={styles.buttonsContainer}>
              <Button
                  children="Next"
                  onPress={() => navigation.navigate('CreateGroup', {mnemonics: mnemonics, address: address})}/>
            </View>
          </View>
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
