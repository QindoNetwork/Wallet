import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { HeaderIcon } from '@components/widgets';
import { General as GeneralActions  } from '@common/actions';
import CryptoCard1 from './CryptoCard1';
import CryptoCard2 from './CryptoCard2';
import ProfileCard from './ProfileCard';
import { inject, observer } from 'mobx-react';
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
@inject('prices', 'wallet')
@observer

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
                  erc20s : navigation.getParam('erc20s')
                })
              } />

        )
    })

    state = { show: false, show2: false };

    renderModal(type) {

    const { gasParam, togethers, erc20s, address, item, groupID  } = this.props.navigation.state.params;
    const target = item.id
    if (type === 1) {
      const limit = gasParam[gas.removeMember].limit
      const price = gasParam[gas.removeMember].price
    }
    else {
      const limit = gasParam[gas.transferGroupOwnership].limit
      const price = gasParam[gas.transferGroupOwnership].price
    }

    if (this.state.show === true) {
      return (  <SecureTransaction
                      togethers={togethers}
                      values={{groupID,target}}
                      limit={limit}
                      price={price}
                      erc20s={erc20s}
                      address={address}
                      gasParam={gasParam}
                      navigation={this.props.navigation}
                      type={gas.quitGroup}/> )
                }

                if (this.state.show2 === true) {
                  return (  <SecureTransaction
                                  togethers={togethers}
                                  values={{groupID,target}}
                                  limit={limit}
                                  price={price}
                                  erc20s={erc20s}
                                  address={address}
                                  gasParam={gasParam}
                                  navigation={this.props.navigation}
                                  type={gas.transferGroupOwnership}/> )
                            }
        }

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

    onPressTransferGroupOwnership() {
      if (this.state.owner === 1){
        GeneralActions.notify("The owner have to be the last of the group to quit", 'long');
      }
      else this.setState({ show: true })
}

onPressRemove() {
  if (this.state.owner === 1){
    GeneralActions.notify("The owner have to be the last of the group to quit", 'long');
  }
  else this.setState({ show: true })
}

  render() {

    const { gasParam, togethers, erc20s, address, item, groupID, navigation  } = this.props.navigation.state.params;

    return(
      <View>

      <View style={styles.buttonsContainer}>
          <Button
            children="Transfer ownership"
            onPress={() => this.setState({ show2: true })}/>
      </View>

      <View style={styles.container}>
      <ProfileCard togethers={togethers} spaceID={spaceID}/>
      <Text style={styles.message}>
      Stats
      </Text>
          <FlatList
            data={erc20s}
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
        data={erc20s}
        renderItem={({ item }) => (
        <CryptoCard2 togethers={togethers} address={address} item={item} groupID={groupID}/>
      )}
  />
  </View>
  <View style={styles.buttonsContainer}>
      <Button
        children="Remove user"
        onPress={() => this.setState({ show: true })}/>
  </View>
  {this.renderModal()}
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
