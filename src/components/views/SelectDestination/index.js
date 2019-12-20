import React from 'react';
import { RefreshControl, TouchableOpacity, ActivityIndicator, FlatList, TextInput, Text, StyleSheet, View } from 'react-native';
import { Button, Camera, InputWithIcon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { General as GeneralActions  } from '@common/actions';
import ProfileCard from './ProfileCard';

@inject('wallet')
@observer

export class SelectDestination extends React.Component {

    static navigationOptions = { title: 'Select destination' };

    state = { address: '', loading: 0, profiles: [], length: 0, owner: 0 };

    componentDidMount() {
      this.update()
    }

    async update() {
       const { navigation } = this.props
       const togethers = navigation.getParam('togethers')
       const address = navigation.getParam('address')
       let profiles = []
       try {
         let groupLength = parseInt ( await togethers.getGroupsLength(address),10)
         if ( groupLength !== 0 ) {
           for ( var i = 0; i < groupLength; i++ ) {
             let groupID = parseInt (await togethers.getGroupID(i),10)
             let userLength = parseInt ( await togethers.getUsersLength(groupID),10)
             if ( userLength > 1 ) {
               for ( var j = 0; j < userLength; j++ ) {
                  var ok = 1
                  var currentAddress = await togethers.getUserAddress(groupID,j)
                  var currentName = await togethers.getUserName(groupID,j)
                  if ( currentAddress !== address ) {
                   for ( var k = 0; k < profiles.length; k++ ) {
                        if ( profiles[k].id === currentAddress) {
                          ok = 0
                          break
                        }
                    }
                    if ( ok === 1 ) {
                      profiles.push({   id:  currentAddress,
                                       name:  currentName,  })
                    }
                  }
                }
             }
           }
         }
         this.setState({ profiles, loading: 1})
       } catch (e) {
       GeneralActions.notify(e.message, 'long');
       }
     }

    async onPressContinue(id) {

        const { navigation } = this.props
        const amount = navigation.getParam('amount')
        const gasParam = navigation.getParam('gasParam')
        const from = navigation.getParam('address')
        const erc20s = navigation.getParam('erc20s')
        const control = navigation.getParam('control')
        const togethers = navigation.getParam('togethers')
        const max = navigation.getParam('max')
        const crypto = navigation.getParam('crypto')
        const address = this.state.address

        try {
          if (1 === 2) {
            let overrides = {
                gasLimit: this.props.navigation.getParam('gasParam')[11].limit,
                gasPrice: this.props.navigation.getParam('gasParam')[11].price * 1000000000,
                //nonce: 123,
                //value: utils.parseEther('1.0'),
                };
          //  await this.props.navigation.getParam('togethers').payForFunds(pseudo, 1, overrides);
            GeneralActions.notify('Wait for validation', 'long');
          }
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
      //  navigation.navigate('WalletDetails', { max, gasParam, address, erc20s, control, togethers, replaceRoute: true });
      this.props.navigation.navigate('ConfirmTransaction', { crypto, address: id, amount });

    }

    render() {
      const { profiles } = this.state

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>

      )

      }

        return (
            <View style={styles.container}>
                <InputWithIcon
                    ref="input"
                    autoFocus
                    icon="qr-scanner"
                    placeholder="Destination address"
                    onChangeText={(address) => this.setState({ address })}
                    onPressIcon={() => this.refs.camera.show()} />
                <Button children="Continue" onPress={() =>this.onPressContinue(this.state.address)} />
                <Camera
                    ref="camera"
                    modal
                    onClose={() => this.refs.camera.hide()}
                    onBarCodeRead={address => this.refs.input.onChangeText(address)} />
                    <Text style={styles.message}>Or pick in the list of your friends</Text>
                    <FlatList
                      data={profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
                      refreshControl={<RefreshControl refreshing={this.props.wallet.loading} onRefresh={() => this.update()} />}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                        style={styles.content}
                        activeOpacity={0.8}
                        onPress={() =>this.onPressContinue(item.id)}>
                          <ProfileCard profile={item} />
                        </TouchableOpacity>
                      )}
                  />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        padding: measures.defaultPadding
    },
    content: {
        flex: 1,
        alignItems: 'stretch',
        marginVertical: measures.defaultMargin
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
