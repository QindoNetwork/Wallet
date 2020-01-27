import { Button } from '@components/widgets';
import React, { Component } from 'react'
import { colors, measures } from '@common/styles';
import { View, StyleSheet } from 'react-native'
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';
import { SecureTransaction } from '@components/widgets';

export class AdminProfile extends Component {

  static navigationOptions = { title: "AdminProfile" };

  state = { show: false, show2: false };

  renderModal() {

  const { gasParam, togethers, address, profile, groupID  } = this.props.navigation.state.params;
  const target = profile.id
  let type

  if (this.state.show === true) {
    type = gas.removeMember
  }

  if (this.state.show2 === true) {
    type = gas.transferGroupOwnership
  }

  return (  <SecureTransaction
                    togethers={togethers}
                    values={{groupID,target}}
                    address={address}
                    gasParam={gasParam}
                    navigation={this.props.navigation}
                    type={type}/> )
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

      return (
          <View style={styles.container}>
              <View style={styles.body}>
              <View style={styles.buttonsContainer}>
                  <Button
                    children="Transfer ownership"
                    onPress={() => onPressTransferGroupOwnership()}/>
              </View>
              <View style={styles.buttonsContainer}>
                  <Button
                    children="Remove user"
                    onPress={() => onPressRemove()}/>
              </View>
              {this.renderModal()}
              </View>
          </View>
      );
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
