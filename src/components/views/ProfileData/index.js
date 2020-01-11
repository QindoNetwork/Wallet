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

    state = { show: false, show2: false, owner: false, spaceID: 0 };

    renderModal() {

    const { gasParam, togethers, erc20s, address, item, groupID  } = this.props.navigation.state.params;
    const target = item.id
    let limit = 0
    let price = 0
    let type

    if (this.state.show === true) {
      limit = gasParam[gas.removeMember].limit * (this.props.length + this.props.profilesLength)
      price = gasParam[gas.removeMember].price
      type = gas.removeMember
    }

    if (this.state.show2 === true) {
      limit = gasParam[gas.transferGroupOwnership].limit
      price = gasParam[gas.transferGroupOwnership].price
      type = gas.transferGroupOwnership
    }

    return (  <SecureTransaction
                      togethers={togethers}
                      values={{groupID,target}}
                      limit={limit}
                      price={price}
                      erc20s={erc20s}
                      address={address}
                      gasParam={gasParam}
                      navigation={this.props.navigation}
                      type={type}/> )
    }


    async componentDidMount() {
      try {
        const { togethers, groupID, item } = this.props.navigation.state.params
        this.setState({ spaceID:  parseInt ( await togethers.getSpaceID(groupID,item.id),10) })
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    onPressTransferGroupOwnership() {
      this.setState({ show2: true,
                          show: false })
}

onPressRemove() {
  this.setState({ show: true,
                        show2: false})
}

  render() {

    const { gasParam, togethers, erc20s, address, item, groupID, navigation  } = this.props.navigation.state.params;

    if (this.state.owner === 1){
      return(
        <View style={styles.container}>

        <View style={styles.buttonsContainer}>
            <Button
              children="Transfer ownership"
              onPress={() => onPressTransferGroupOwnership()}/>
        </View>
        <ProfileCard togethers={togethers} spaceID={this.state.spaceID}/>
    <View style={styles.buttonsContainer}>
        <Button
          children="Remove user"
          onPress={() => onPressRemove()}/>
    </View>
    {this.renderModal()}
      </View>)
    }

    return(
      <View style={styles.container}>
<ProfileCard togethers={togethers} spaceID={this.state.spaceID}/>
    </View>)


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
