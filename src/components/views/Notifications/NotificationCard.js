import React from 'react';
import { Clipboard, ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import Modal from 'react-native-modal';
import { Contracts as contractsAddress } from '@common/constants';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export default class TransactionCard extends React.Component {

  render() {

      return(

        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Text style={styles.title}>{this.props.notification.blockNumber}</Text>
            </View>
            <View style={styles.rightColumn}>
                <Text style={styles.balance}>{this.props.notification.address}</Text>
            </View>
        </View>

    )

  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 60,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGray
  },
  leftColumn: {
      flex: 1
  },
  title: {
      fontSize: measures.fontSizeLarge,
      color: colors.black
  },
  balance: {
      fontSize: measures.fontSizeMedium + 2,
      fontWeight: 'bold',
      color: colors.black
  },
  fiatBalance: {
      fontSize: measures.fontSizeMedium - 3,
      color: colors.black
  },
  rightColumn: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center'
  }
});
