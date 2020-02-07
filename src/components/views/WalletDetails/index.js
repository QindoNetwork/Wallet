import React from 'react';
import { TabView } from '@components/widgets';
import { ReceiveCoins, WalletExtract, WalletSettings, Groups, Crypto, ChangeCrypto } from '..';
import { HeaderIcon } from '@components/widgets';
import { colors } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export class WalletDetails extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
          title: "Togethers",
      })

    tabs = [
        { id: 'extract', label: 'Historic', icon: 'list',               content: <WalletExtract togethers = {this.props.navigation.getParam('togethers')} /> },
        { id: 'receive', label: 'Receive', icon: 'qrcode', type: 'fa',  content: <ReceiveCoins /> },
        { id: 'send', label: 'Send', icon: 'cube-send', type: 'mdc',    content: <Crypto togethers = {this.props.navigation.getParam('togethers')}
                                                                                         navigation = {this.props.navigation}
                                                                                         groupID = '0'
                                                                                         gasParam = {this.props.navigation.getParam('gasParam')} /> },
        { id: 'network', label: 'Network', icon: 'contacts',            content: <Groups navigation = {this.props.navigation}
                                                                                         gasParam = {this.props.navigation.getParam('gasParam')}
                                                                                         togethers = {this.props.navigation.getParam('togethers')} /> },
        { id: 'swap', label: 'Swap', icon: 'flask',                  content: <ChangeCrypto navigation = {this.props.navigation}
                                                                                         gasParam = {this.props.navigation.getParam('gasParam')}
                                                                                         togethers = {this.props.navigation.getParam('togethers')} /> },
        { id: 'settings', label: 'Settings', icon: 'settings',          content: <WalletSettings navigation = {this.props.navigation}
                                                                                                 gasParam = {this.props.navigation.getParam('gasParam')}
                                                                                                 togethers = {this.props.navigation.getParam('togethers')} /> }
    ];

    render() {
        return <TabView tabs={this.tabs} />;
    }
}
