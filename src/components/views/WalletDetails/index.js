import React from 'react';
import { TabView } from '@components/widgets';
import { ReceiveCoins, WalletExtract, WalletSettings, Groups, Crypto } from '..';

export class WalletDetails extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Togethers"
    });

    tabs = [
        { id: 'extract', label: 'Historic', icon: 'list',               content: <WalletExtract togethers = {this.props.navigation.getParam('togethers')} /> },
        { id: 'receive', label: 'Receive', icon: 'qrcode', type: 'fa',  content: <ReceiveCoins /> },
        { id: 'send', label: 'Send', icon: 'cube-send', type: 'mdc',    content: <Crypto address = {this.props.navigation.getParam('address')}
                                                                                         togethers = {this.props.navigation.getParam('togethers')}
                                                                                         navigation = {this.props.navigation}
                                                                                         groupID = '0'
                                                                                         gasParam = {this.props.navigation.getParam('gasParam')} /> },
        { id: 'network', label: 'Network', icon: 'contacts',            content: <Groups navigation = {this.props.navigation}
                                                                                         gasParam = {this.props.navigation.getParam('gasParam')}
                                                                                         address = {this.props.navigation.getParam('address')}
                                                                                         togethers = {this.props.navigation.getParam('togethers')} /> },
        { id: 'settings', label: 'Settings', icon: 'settings',          content: <WalletSettings navigation = {this.props.navigation}
                                                                                                 gasParam = {this.props.navigation.getParam('gasParam')}
                                                                                                 address = {this.props.navigation.getParam('address')}
                                                                                                 togethers = {this.props.navigation.getParam('togethers')} /> }
    ];

    render() {
        return <TabView tabs={this.tabs} />;
    }
}
