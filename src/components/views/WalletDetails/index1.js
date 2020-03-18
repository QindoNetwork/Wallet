import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Dashboard from 'react-native-dashboard';
import { HeaderIcon } from '@components/widgets';
import { colors } from '@common/styles';

const items = [
  { name: 'Historic', background: '#3498db', icon: 'list' },
  { name: 'receive', background: '#ef0202', icon: 'qrcode' },
  { name: 'send', background: '#efcf02', icon: 'cube-send' },
  { name: 'network', background: '#02ef1d', icon: 'contacts' },
  { name: 'swap', background: '#02cbef', icon: 'flask' },
  { name: 'settings', background: '#ef5802', icon: 'settings' },
];

export class WalletDetails extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Togethers",
        headerRight: (
            <HeaderIcon
                name='log-out'
                size='medium'
                color={colors.white}
                onPress={() => navigation.navigate('WalletsOverview',
                  { replaceRoute: true }
                )
                }/>),
    })

  _card = el => {
    const { gasParam, togethers, groupID } = this.props.navigation.state.params;
    switch (el.name) {
        case 'settings':
        this.props.navigation.navigate('MainSettings',{ togethers, gasParam })
        case 'receive':
        this.props.navigation.navigate('MainReceive',{ togethers })
        case 'send':
        this.props.navigation.navigate('MainSend',{ groupID, togethers, gasParam,  })
        case 'network':
        this.props.navigation.navigate('MainNetwork',{ togethers, gasParam })
        case 'swap':
        this.props.navigation.navigate('MainSwap',{ togethers, gasParam })
        case 'Historic':
        this.props.navigation.navigate('MainHistory',{ togethers })
    }
  };

  render() {
   return (
     <View style={styles.container}>
       <Dashboard items={items} background={true} card={this._card} column={2} />
     </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: colors.defaultBackground,
 },
});
