import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import CryptoCard from './CryptoCard';

export class CloseDemand extends React.Component {

  static navigationOptions = { title: "My demand" };

  state = { loading: 0, size: 0 };

  async componentDidMount() {
    const { togethers, groupID, address } = this.props
    try {
      let size = 0
      let given
      for ( var i = 0; i < size; i++ ) {
         given = parseInt ( await togethers.getCryptoGiven(groupID, address, i),10)
        if ( given !== 0 ) {
          size = size + 1
        }
      }
      this.setState({ size,
                      loading: 1 })
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

  async demand() {
    const togethers = this.props.navigation.getParam('togethers')
    const groupID = this.props.navigation.getParam('groupID')
    try {
      let overrides = {
          gasLimit: this.props.navigation.getParam('gasParam')[6].limit * this.state.size,
          gasPrice: this.props.navigation.getParam('gasParam')[6].price * 1000000000,
          //nonce: 123,
          //value: utils.parseEther('1.0'),
          };
          await togethers.withdrawFunds(groupID,overrides)
          GeneralActions.notify('Your transaction was sent successfully and now is waiting for confirmation. Please wait', 'long');
    } catch (e) {
      GeneralActions.notify(e.message, 'long');
    }
}

  render() {


    if (this.state.loading === 0){

      return(

          <ActivityIndicator size="large"/>
    )

    }

    return(

      <View style={styles.container}>
      <View style={styles.buttonsContainer}>
          <Button
            children="Close"
            onPress={() => this.demand()}/>
      </View>
          <FlatList
            data={this.props.ERC20s}
            renderItem={({ item }) => (
            <CryptoCard crypto={item} address={address}/>
          )}
      />
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
