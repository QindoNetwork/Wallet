import React, { Component } from "react";
import { Text, TouchableOpacity, View, FlatList } from 'react-native';

import styles from '../../Styles'

class LanguagesForm extends Component {

  render() {

languages = [       {key : 1,
                    name : "English"},
                    {key : 2,
                    name : "French"},
                    {key : 3,
                    name : "Spanish"},
                    {key : 4,
                    name : "Portuguese"},
                    {key : 5,
                    name : "Italian"},
                    {key : 6,
                    name : "Arabic"},
                    {key : 7,
                    name : "Chinese"},
                    {key : 8,
                    name : "Japanese"},
                    {key : 9,
                    name : "Russian"},
                    {key : 10,
                    name : "German"},
                    {key : 11,
                    name : "Polish"},
                    {key : 12,
                    name : "Roman"},
                    {key : 13,
                    name : "Indian"}  ]

    return (



    <View style={styles.inputWrapper}>

    <FlatList
        data={languages.sort((prev, next) => prev.name.localeCompare(next.name))}
        width='100%'
        renderItem={({ item }) => (


          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('NameScreen',
              {
                languageKey: item.key,
                account: this.props.account,
                gasPrice: this.props.gasPrice,
                })
              }
              style={styles.button4}
              >

              <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
    );
  }
}

export default LanguagesForm;
