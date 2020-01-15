import React from 'react';
import { TabView } from '@components/widgets';
import { ReceiveCoins, WalletExtract, WalletSettings, Groups, Crypto } from '..';

export class WalletDetails extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Togethers"
    });

    tabs = [
        { id: 'extract', label: 'Historic', icon: 'list', content: <WalletExtract {...this.props}/> },
        { id: 'receive', label: 'Receive', icon: 'qrcode', type: 'fa', content: <ReceiveCoins {...this.props} /> },
        { id: 'send', label: 'Send', icon: 'cube-send', type: 'mdc', content: <Crypto connection = {this.props.navigation.getParam('connection')} address = {this.props.navigation.getParam('address')} togethers = {this.props.navigation.getParam('togethers')} navigation = {this.props.navigation}
                                                                                      gasParam = {this.props.navigation.getParam('gasParam')}/> },
        { id: 'network', label: 'Network', icon: 'contacts', content: <Groups connection = {this.props.navigation.getParam('connection')} navigation = {this.props.navigation} gasParam = {this.props.navigation.getParam('gasParam')} address = {this.props.navigation.getParam('address')}
                                                                               togethers = {this.props.navigation.getParam('togethers')}/> },
        { id: 'settings', label: 'Settings', icon: 'settings', content: <WalletSettings navigation = {this.props.navigation} gasParam = {this.props.navigation.getParam('gasParam')} address = {this.props.navigation.getParam('address')}
                                                                           togethers = {this.props.navigation.getParam('togethers')} /> }
    ];

    render() {
        return <TabView tabs={this.tabs} />;
    }
}
