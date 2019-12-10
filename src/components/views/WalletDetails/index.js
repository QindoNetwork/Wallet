import React from 'react';
import { TabView } from '@components/widgets';
import { ReceiveCoins, SendCoins, WalletExtract, WalletSettings, Groups } from '..';

export class WalletDetails extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Togethers"
    });

    tabs = [
        { id: 'extract', label: 'Extract', icon: 'list', content: <WalletExtract {...this.props} /> },
        { id: 'receive', label: 'Receive', icon: 'qrcode', type: 'fa', content: <ReceiveCoins {...this.props} /> },
        { id: 'send', label: 'Send', icon: 'cube-send', type: 'mdc', content: <SendCoins {...this.props} /> },
        { id: 'network', label: 'Network', icon: 'contacts', content: <Groups mnemonics = {this.props.navigation.getParam('mnemonics')} address = {this.props.navigation.getParam('address')} /> },
        { id: 'settings', label: 'Settings', icon: 'settings', content: <WalletSettings {...this.props} /> }
    ];

    render() {
        return <TabView tabs={this.tabs} />;
    }
}
