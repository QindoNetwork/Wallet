import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
import { inject, observer } from 'mobx-react';
import CryptoCard from '../Crypto/CryptoCard';
@inject('prices', 'wallet')
@observer

export class CloseDemand extends React.Component {

  static navigationOptions = { title: "My demand" };

  state = { loading: 0, erc20s: [], description: '', demandID: 0,  show: false };

  renderModal() {

    const { gasParam, togethers, address, groupID } = this.props.navigation.state.params;

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{groupID}}
          address={address}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gas.withdrawFunds}/> )
    }
  }

  async componentDidMount() {
    const { gasParam, togethers, address, groupID } = this.props.navigation.state.params;
    var erc20s = []
    try {
      const given = await togethers.getGiven(address, groupID)
      erc20s.push({ name: "Ethers",
                    symbol: "ETH",
                    balance: parseInt (given.ETHIn ,10)})
      erc20s.push({ name: "Togethers-USD",
                    symbol: "TGTU",
                    balance: parseInt (given.USDin ,10)})
      erc20s.push({ name: "Togethers-EUR",
                    symbol: "TGTE",
                    balance: parseInt (given.EURin ,10)})
      const demandID = parseInt ( await togethers.getSpaceID(groupID,address),10)
      const description = await togethers.getDescription(groupID,address)
      this.setState({ erc20s,
                      demandID,
                      description,
                      loading: 1 })
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

  render() {

    const { erc20s, description, demandID } = this.state

    if (this.state.loading === 0){

      return(
        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>
    )

    }

    return(

      <View style={styles.container}>
      <FlatList
              style={styles.content}
              data={erc20s.sort((prev, next) => prev.name.localeCompare(next.name))}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ item }) => (<CryptoCard crypto={item} />)} />
            <View style={styles.buttonsContainer}>
                <Button
                  children="Close"
                  onPress={() => this.setState({ show: true })}/>
            </View>
      {this.renderModal()}
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
    buttonDisabled: {
        opacity: 0.5,
    },
    content: {
        marginTop: measures.defaultMargin
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
