import * as yup from 'yup'
import { Formik } from 'formik'
import { General as GeneralActions  } from '@common/actions';
import React, { Component, Fragment } from 'react'
import { Gas as gas, Restrictions as restrictions } from '@common/constants';
import { colors, measures } from '@common/styles';
import {Keyboard, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react';
import { SecureTransaction } from '@components/widgets';
import { Button, Camera, InputWithIcon } from '@components/widgets';
@inject('prices', 'wallet')
@observer

export class AddProfile extends Component {

  static navigationOptions = { title: "Add a friend" };

  state = { show: 0, loading: 0, owner: 0, address: '' };

  renderModal(value) {

    const { gasParam, togethers, myPseudo, erc20s, address, groupID  } = this.props.navigation.state.params;
    const limit = gasParam[gas.createProfile].limit
    const price = gasParam[gas.createProfile].price

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{groupID,value}}
          limit={limit}
          price={price}
          myPseudo={myPseudo}
          erc20s={erc20s}
          address={address}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gas.createProfile}/> )
    }
  }

  async componentDidMount() {
    const { groupID, togethers, address  } = this.props.navigation.state.params;
    try {
        this.setState({ owner:  parseInt ( await togethers.isOwner(groupID,address),10),
                        loading: 1})
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
  }

  render() {

    if (this.state.loading === 0){

      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <ActivityIndicator size="large"/>
        </View>
      </View>

    )

    }

    if (this.state.owner === 1) {

    return (
      <View style={styles.container}>
      <InputWithIcon
          ref="input"
          autoFocus
          icon="qr-scanner"
          placeholder="Destination address"
          onChangeText={(address) => this.setState({ address })}
          onPressIcon={() => this.refs.camera.show()} />
      <Button children="Continue" onPress={() =>this.renderModal(this.state.address)} />
      <Camera
          ref="camera"
          modal
          onClose={() => this.refs.camera.hide()}
          onBarCodeRead={address => this.refs.input.onChangeText(address)} />
      </View>
      );


      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.message}>You have to be administrator to add a member to the group</Text>
        </View>
      </View>

    )

  }s


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
