import { Button } from '@components/widgets';
import React, { Component } from 'react'
import { colors, measures } from '@common/styles';
import { View, StyleSheet, Text } from 'react-native'
import { Gas as gas } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export class AdminProfile extends Component {

  static navigationOptions = { title: "Administration" };

  state = { show: false, show2: false };

  renderModal() {

  const { gasParam, togethers, item, user  } = this.props.navigation.state.params;
  const target = item.id
  const groupID = user.id
  let type

  if (this.state.show === true) {
    type = gas.removeMember
    return (  <SecureTransaction
                      togethers={togethers}
                      values={{groupID,target}}
                      gasParam={gasParam}
                      navigation={this.props.navigation}
                      type={type}/> )
  }

  if (this.state.show2 === true) {
    type = gas.transferGroupOwnership
    return (  <SecureTransaction
                      togethers={togethers}
                      values={{groupID,target}}
                      gasParam={gasParam}
                      navigation={this.props.navigation}
                      type={type}/> )
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

    const { languages } = this.props

    if (this.props.navigation.state.params.user.owner == false){
      return(
        <View style={styles.container}>
            <View style={styles.body}>
        <Text>
You must be owner of the group
        </Text>
        </View>
    </View>
)
    }

      return (
          <View style={styles.container}>
              <View style={styles.body}>
              <View style={styles.buttonsContainer}>
                  <Button
                    children={ LanguagesActions.label12(languages.selectedLanguage) }
                    onPress={() => this.onPressTransferGroupOwnership()}/>
              </View>
              <View style={styles.buttonsContainer}>
                  <Button
                    children={ LanguagesActions.label13(languages.selectedLanguage) }
                    onPress={() => this.onPressRemove()}/>
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
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    }
});
