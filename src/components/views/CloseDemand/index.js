import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
import CryptoCard from './CryptoCard';
import { inject, observer } from 'mobx-react';
@inject('prices', 'wallet')
@observer

export class CloseDemand extends React.Component {

  static navigationOptions = { title: "My demand" };

  state = { loading: 0, size: 0, show: false };

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
    try {
      const size = 0
      if ( erc20s.length !== 0 ) {
      for ( var i = 0; i < erc20s.length; i++ ) {
         given = parseInt ( await togethers.getCryptoGiven(groupID, address, i),10)
        if ( given !== 0 ) {
          size = size + 1
        }
      }
      }
      this.setState({ size,
                      loading: 1 })
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

  render() {
    const { gasParam, togethers, address, groupID } = this.props.navigation.state.params;

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
      <View style={styles.buttonsContainer}>
          <Button
            children="Close"
            onPress={() => this.setState({ show: true })}/>
      </View>
          <FlatList
            data={erc20s}
            renderItem={({ item }) => (
            <CryptoCard togethers={togethers} address={address} item={item} groupID={groupID}/>
          )}
      />
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
