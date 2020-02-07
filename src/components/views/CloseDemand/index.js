import React from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Gas as gas } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
import { CryptoCard } from '@components/widgets';

export class CloseDemand extends React.Component {

  static navigationOptions = { title: "My demand" };

  state = { show: false };

  renderModal() {

    const { gasParam, togethers, groupID } = this.props.navigation.state.params;

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{groupID}}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gas.withdrawFunds}/> )
    }
  }

  render() {

    const { item } = this.props.navigation.state.params;
    const USDin = item.USDin
    const EURin = item.EURin
    const ETHin = item.ETHin
    const description = item.description

    var erc20s = []
    erc20s.push({ name: "Ethers",
                    symbol: "ETH",
                    balance: ETHin ,})
    erc20s.push({ name: "Togethers-USD",
                    symbol: "TGTU",
                    balance: USDin,
                   decimals: 18})
    erc20s.push({ name: "Togethers-EUR",
                    symbol: "TGTE",
                    balance: EURin,
                    decimals: 18})

    return(

      <View style={styles.container}>
      <Text style={styles.message}>{description}</Text>
      <FlatList
              style={styles.content}
              data={erc20s.sort((prev, next) => prev.name.localeCompare(next.name))}
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
    content: {
        marginTop: measures.defaultMargin
    },
});
