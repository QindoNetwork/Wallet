import React from 'react';
import { TabView } from '@components/widgets';
import { ReceiveCoins, WalletExtract, WalletSettings, Groups, Crypto } from '..';

export class WalletDetails extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('myPseudo')
    });

    tabs = [
        { id: 'extract', label: 'Extract', icon: 'list', content: <WalletExtract togethers = {this.props.navigation.getParam('togethers')} /> },
        { id: 'receive', label: 'Receive', icon: 'qrcode', type: 'fa', content: <ReceiveCoins {...this.props} /> },
        { id: 'send', label: 'Send', icon: 'cube-send', type: 'mdc', content: <Crypto address = {this.props.navigation.getParam('address')} togethers = {this.props.navigation.getParam('togethers')} navigation = {this.props.navigation}
                                                                                      ERC20s = {this.props.navigation.getParam('erc20s')} gasParam = {this.props.navigation.getParam('gasParam')} max = {this.props.navigation.getParam('max')} type = '0'/> },
        { id: 'network', label: 'Network', icon: 'contacts', content: <Groups navigation = {this.props.navigation} gasParam = {this.props.navigation.getParam('gasParam')} address = {this.props.navigation.getParam('address')} max = {this.props.navigation.getParam('max')}
                                                                              ERC20s = {this.props.navigation.getParam('erc20s')} control = {this.props.navigation.getParam('control')} togethers = {this.props.navigation.getParam('togethers')} /> },
        { id: 'settings', label: 'Settings', icon: 'settings', content: <WalletSettings {...this.props} /> }
    ];

    render() {
        return <TabView tabs={this.tabs} />;
    }
}
