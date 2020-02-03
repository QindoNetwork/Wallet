import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NumberGrid } from '@components/widgets';
import { colors, measures } from '@common/styles';

export class Calculator extends React.Component {

    state = { amount: '' };

    get amount() {
        return this.state.amount || 0;
    }

    onChange(value) {
        let { amount } = this.state;
        switch (value) {
            case 'erase':
                amount = amount.slice(0, amount.length-1);
                break;

            case '.':
                if (amount.indexOf('.') > -1) return;
                else if (!amount.length) amount += '0.';
                else amount += '.';
                break;

            default:
                if (amount === '0') amount = value;
                else amount += value;
                break;
        }
        this.setState({ amount });
    }

    renderPanel() {
        return (
            <View style={styles.container2}>
                <View style={styles.row}>
                    <Text style={styles.amount}>{this.amount}</Text>
                    <Text style={styles.unit}>{this.props.symbol}</Text>
                </View>
            </View>
        );

    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderPanel()}
                <View style={styles.bottomContainer}>
                    <NumberGrid onPressNumber={(number) => this.onChange(number)} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        flex: 5,
        alignItems: 'stretch'
    },
    bottomContainer: {
        flex: 4,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    container2: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'space-around'
   },
   row: {
       alignItems: 'center',
       justifyContent: 'center',
       flexDirection: 'row'
   },
   amount: {
       fontSize: measures.fontSizeLarge,
       fontWeight: 'bold'
   },
   unit: {
       fontSize: measures.fontSizeMedium,
       color: colors.gray,
       marginLeft: measures.defaultMargin
   }
});
