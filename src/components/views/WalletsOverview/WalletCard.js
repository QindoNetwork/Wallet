import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import { Wallets as WalletActions } from '@common/actions';
import { Image as ImageUtils } from '@common/utils';
import LinearGradient from 'react-native-linear-gradient';


export default class WalletCard extends React.Component {

    componentDidMount() {
        WalletActions.updateBalance(this.props.wallet);
    }

    render() {
        const { onPress, wallet } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
            <LinearGradient
     start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
     locations={[0,0.5,0.6]}
     colors={['darkslategray', '#3b5998', '#4c669f']}
     style={styles.container}>
                <View style={styles.leftColumn}>
                <Icon name='wallet' size='large' type='ent' color='white' />
                </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{wallet.name}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                    <Image style={styles.avatar}
                        source={{ uri: ImageUtils.generateAvatar(wallet.address,50) }} />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 8,
        height: 130
    },
    leftColumn: {
        flex: 1,
        justifyContent: 'center',
        color: 'darkslategray'
    },
    middleColumn: {
        flex: 4,
        justifyContent: 'center',
        color: 'white'
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        color: 'white'
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        color: 'white'
    },
    avatar: {
      backgroundColor: 'transparent',
      width: 100,
      height: 100
    }
});
