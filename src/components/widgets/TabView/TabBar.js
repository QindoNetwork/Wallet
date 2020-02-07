import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@common/styles';
import TabBarIcon from './TabBarIcon';

export default class TabBar extends React.Component {

    renderTab = (tab, i) => (
        <TabBarIcon
            key={i}
            {...tab}
            active={this.props.active === i}
            onPress={() => this.props.onPressTabItem(tab.id)} />
    )

    render() {
        const { tabs } = this.props;
        return (
            <View style={styles.container}>
                {tabs.map(this.renderTab)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: 80,
        borderTopWidth: 15,
        borderBottomWidth: 15,
        borderColor: 'blue',
        backgroundColor: 'blue'
    }
});
