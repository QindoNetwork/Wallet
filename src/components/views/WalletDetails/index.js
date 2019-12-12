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
        { id: 'send', label: 'Send', icon: 'cube-send', type: 'mdc', content: <SendCoins navigation = {this.props.navigation} ERC20s = {this.props.navigation.getParam('ERC20s')} gasParam = {this.props.navigation.getParam('gasParam')}/> },
        { id: 'network', label: 'Network', icon: 'contacts', content: <Groups navigation = {this.props.navigation} gasParam = {this.props.navigation.getParam('gasParam')} address = {this.props.navigation.getParam('address')} ERC20s = {this.props.navigation.getParam('ERC20s')} control = {this.props.navigation.getParam('control')} togethers = {this.props.navigation.getParam('togethers')} /> },
        { id: 'settings', label: 'Settings', icon: 'settings', content: <WalletSettings {...this.props} /> }
    ];

    render() {
        return <TabView tabs={this.tabs} />;
    }
}
