import React from 'react';
import { TabView } from '@components/widgets';
import { ReceiveCoins, WalletExtract, WalletSettings, Groups, Crypto, ChangeCrypto } from '..';
import { HeaderIcon } from '@components/widgets';
import { colors } from '@common/styles';
import { Languages as LanguagesActions } from '@common/actions';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class WalletDetails extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
          title: "Togethers",
          headerLeft: (
              <HeaderIcon
                  name='log-out'
                  size='large'
                  color={colors.white}
                  onPress={() => navigation.navigate('WalletsOverview',
                    { replaceRoute: true }
                  )
                  }/>),
      })

    tabs = [
        { id: 'Historic', label: LanguagesActions.label85(this.props.languages.selectedLanguage), icon: 'list',                 content: <WalletExtract togethers = {this.props.navigation.getParam('togethers')}/> },
        { id: 'receive', label: LanguagesActions.label86(this.props.languages.selectedLanguage), icon: 'qrcode', type: 'fa',    content: <ReceiveCoins /> },
        { id: 'send', label: LanguagesActions.label87(this.props.languages.selectedLanguage), icon: 'cube-send', type: 'mdc',   content: <Crypto togethers = {this.props.navigation.getParam('togethers')}
                                                                                                                                          navigation = {this.props.navigation}
                                                                                                                                          groupID = '0'

                                                                                                                                          gasParam = {this.props.navigation.getParam('gasParam')} /> },
        { id: 'network', label: LanguagesActions.label88(this.props.languages.selectedLanguage), icon: 'contacts',              content: <Groups navigation = {this.props.navigation}
                                                                                                                                          mode = '0'
                                                                                                                                          gasParam = {this.props.navigation.getParam('gasParam')}
                                                                                                                                          togethers = {this.props.navigation.getParam('togethers')}
                                                                                                                                          title2 = {LanguagesActions.title6(this.props.languages.selectedLanguage)} /> },
        { id: 'swap', label: LanguagesActions.label89(this.props.languages.selectedLanguage), icon: 'flask',                    content: <ChangeCrypto navigation = {this.props.navigation}
                                                                                                                                          gasParam = {this.props.navigation.getParam('gasParam')}
                                                                                                                                          togethers = {this.props.navigation.getParam('togethers')}
                                                                                                                                          /> },
        { id: 'settings', label: LanguagesActions.label90(this.props.languages.selectedLanguage), icon: 'settings',             content: <WalletSettings navigation = {this.props.navigation}
                                                                                                                                          gasParam = {this.props.navigation.getParam('gasParam')}
                                                                                                                                          togethers = {this.props.navigation.getParam('togethers')}
                                                                                                                                           /> }
    ];

    render() {
        return <TabView tabs={this.tabs} />;
    }
}
