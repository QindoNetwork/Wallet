import { General as GeneralActions  } from '@common/actions';
import React, { Component } from 'react'
import { Gas as gas } from '@common/constants';
import { colors, measures } from '@common/styles';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { SecureTransaction } from '@components/widgets';
import { Button, Camera, InputWithIcon } from '@components/widgets';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export class AddProfile extends Component {

  static navigationOptions = { title: "Add a friend" };

  state = { show: false, address: '' };

  renderModal(value) {

    const { gasParam, togethers, groupID  } = this.props.navigation.state.params;

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{groupID,value}}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gas.createProfile}/> )
    }
  }

  render() {

    if (this.props.navigation.state.params.owner == true) {

    return (
      <View style={styles.container}>
      <InputWithIcon
          ref="input"
          autoFocus
          icon="qr-scanner"
          placeholder="Destination address"
          onChangeText={(address) => this.setState({ address })}
          onPressIcon={() => this.refs.camera.show()} />
      <Button children="Continue" onPress={() => this.setState({ show: true })} />
      <Camera
          ref="camera"
          modal
          onClose={() => this.refs.camera.hide()}
          onBarCodeRead={address => this.refs.input.onChangeText(address)} />
      {this.renderModal(this.state.address)}
      </View>
      );
}

      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.message}>You have to be administrator to add a member to the group</Text>
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
    }
});
