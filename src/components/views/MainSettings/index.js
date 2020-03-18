import React from 'react';
import { TabView } from '@components/widgets';
import { ReceiveCoins, WalletExtract, WalletSettings, Groups, Crypto, ChangeCrypto } from '..';
import { HeaderIcon } from '@components/widgets';
import { colors } from '@common/styles';
import { Languages as LanguagesActions } from '@common/actions';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class MainSettings extends React.Component {

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

      render() {

        return (
          <WalletExtract togethers = {this.props.navigation.getParam('togethers')} />
          );
        }
}
