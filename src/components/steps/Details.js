import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react"
import {Text, View, FlatList, TouchableOpacity} from 'react-native'
import { ListItem, List } from "react-native-elements"
import Description from "./Description"
import styles from '../Styles'

export class PayScreen extends Component {

render() {

  return(

<TouchableOpacity
    style={styles.button}
    onPress={() => this.props.navigation.navigate('CryptoScreen',
    {
    groupID : this.props.groupID,
    account : this.props.account,
    gasPrice: this.props.gasPrice,
    amount : amount,
    balance : balance,
    symbol : cryptoSymbol
    })
    }>
    <Text style={styles.label}>GIVE</Text>
</TouchableOpacity>

)
}
}


export class MyProfileScreen extends Component {

  render() {

    return (

      <View style={styles.inputWrapper}>
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => this.props.navigation.navigate('MyProfileScreen',
      {
        account: this.props.account,
        user: this.props.user,
        gasPrice: this.props.gasPrice,
        groupID: this.props.groupID,
        displayData: this.props.displayData,
        size: this.props.size,
        length: this.props.length,
        cryptoSymbols: this.props.cryptoSymbols,
        cryptoAmounts: this.props.cryptoAmounts,
        })
      }>
      <View style={styles.button}>
      <Text style={styles.label}>MY DEMAND</Text>
      </View>
      </TouchableOpacity>
      </View>
    )
  }
}


export class Info extends Component {

render() {

  let currentList = []

  for ( var i =0; i < this.props.size; i++) {
    if ( this.props.list1[i] > 0)
      {
  currentList.push({amount: this.props.list1[i],
                    crypto: this.props.list2[i]})
      }
  }

  return (

<View style={styles.inputWrapper}>
<Text style={styles.label}>{this.props.description}</Text>
{
currentList.map((l, i) => (
 <ListItem
   key={i}
   title={l.amount}
   subtitle={l.crypto}
   bottomDivider
 />
))
}
      </View>

    )
  }
}

export class AddProfileScreen extends Component {

render() {

  return (


    <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate('AddProfileScreen',
        {
          account: this.props.account,
          groupID: this.props.groupID,
        })
        }>
        <Text style={styles.label}>ADD A FRIEND</Text>
    </TouchableOpacity>

    )
  }
}

export class ProfileDataScreen extends Component {

render() {

    let currentList = this.props.list

  return (

<View style={styles.inputWrapper}>
    <FlatList
        data={currentList.sort((prev, next) => prev.name.localeCompare(next.name))}
        width='100%'
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.button3}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('ProfileDataScreen',
          {
            account: this.props.account,
            user: item.name,
            key: item.key,
            groupID: this.props.groupID,
            gasPrice: this.props.gasPrice,
            owner: this.props.owner,
            balance: this.props.balance,
            size: this.props.size,
            cryptoSymbols: this.props.cryptoSymbols,
            demandID: this.props.demandID,
            })
          }>
          <Description
          account={item.key}
          groupID={this.props.groupID}
          pseudo={item.name}
          name={item.name2}
          src={item.ipfs}
          gasPrice={this.props.gasPrice}
          type="2"
        />
        </TouchableOpacity>
        )}
      />
      </View>

    )
  }
}

export class DemandScreen extends Component {

render() {

  return (


    <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate('DemandScreen',
        {
        groupID : this.props.groupID,
        gasPrice: this.props.gasPrice,
        account : this.props.account,

        })
        }>
        <Text style={styles.label}>DEMAND</Text>
    </TouchableOpacity>

    )
  }
}
