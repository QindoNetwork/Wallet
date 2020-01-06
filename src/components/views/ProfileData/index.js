import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { HeaderIcon } from '@components/widgets';
import { General as GeneralActions  } from '@common/actions';
import CryptoCard1 from './CryptoCard1';
import CryptoCard2 from './CryptoCard2';

export class ProfileData extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: "profile",
        headerRight: (
            <HeaderIcon
                name='cash'
                size='medium'
                color={colors.white}
                onPress={() => navigation.navigate('CryptoType1',
                {
                  address : navigation.getParam('address'),
                  togethers : navigation.getParam('togethers'),
                  groupID : navigation.getParam('groupID'),
                  gasParam : navigation.getParam('gasParam'),
                  ERC20s : navigation.getParam('ERC20s')
                })
              } />

        )
    })

    async componentDidMount() {
      try {
        const { togethers, item, groupID, address } = this.props
        if (item.id !== 0){
          this.setState({ balance:  parseInt ( await togethers.getCryptoGiven(groupID,address,item.id),10) })
        }
        else this.setState({ balance:  Number(WalletUtils.formatBalance(parseInt ( await togethers.getCryptoGiven(groupID,address,item.key),10)))})
        this.setState({ loading: 1})
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

  async removeMember() {
    const togethers = this.props.navigation.getParam('togethers')
    const address = this.props.navigation.getParam('address')
    const groupID = this.props.navigation.getParam('groupID')
    try {
      let overrides = {
          gasLimit: this.props.navigation.getParam('gasParam')[7].limit,
          gasPrice: this.props.navigation.getParam('gasParam')[7].price * 1000000000,
          //nonce: 123,
          //value: utils.parseEther('1.0'),
          };
          await togethers.removeMember(address,groupID,overrides)
          GeneralActions.notify('Your transaction was sent successfully and now is waiting for confirmation. Please wait', 'long');
    } catch (e) {
      GeneralActions.notify(e.message, 'long');
    }
}

  render() {

    const { navigation } = this.props
    const ERC20s = navigation.getParam('ERC20s')
    const gasParam = navigation.getParam('gasParam')
    const address = navigation.getParam('address')
    const togethers = navigation.getParam('togethers')
    const profile = navigation.getParam('item')
    const groupID = navigation.getParam('groupID')
    const limit = gasParam[7].limit
    const price = gasParam[7].price
    const ethPrice = (price * limit) / 1000000000

    return(
      <View>

      <View style={styles.container}>
      <Text style={styles.message}>
      Stats
      </Text>
          <FlatList
            data={ERC20s}
            renderItem={({ item }) => (
            <CryptoCard1 togethers={togethers} from={address} to={profile.id} item={item} groupID={groupID}/>
          )}
      />
      </View>
      <View style={styles.container}>
        <Text style={styles.message}>
        Current demand
        </Text>
      <FlatList
        data={ERC20s}
        renderItem={({ item }) => (
        <CryptoCard2 togethers={togethers} address={address} item={item} groupID={groupID}/>
      )}
  />
  </View>
  <View style={styles.buttonsContainer}>
      <Button
        children="Remove user"
        onPress={() => {
            Alert.alert(
              'SignUp',
              'It will cost maximum ' + ethPrice + ' ETH',
              [
                  { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                  { text: 'Confirm', onPress: () => this.removeMember() }
              ],
              { cancelable: false }
          );
          }}/>
  </View>
    </View>
  )}

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
    buttonDisabled: {
        opacity: 0.5,
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
