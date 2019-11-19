import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import { Text, View, ActivityIndicator } from 'react-native';
import PropTypes from "prop-types";
import { Badge } from "react-native-elements";
import UserAvatar from 'react-native-user-avatar'

import styles from '../Styles'

class Description extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey: null,
      dataKey1: null,
    };

  }

  componentDidMount() {

    this.setState({
                dataKey : this.contracts["Togethers"].methods["mappProfileInGroup"].cacheCall(this.props.groupID, this.props.account),
                dataKey1 : this.contracts["Togethers"].methods["mappNbDemandsInGroup"].cacheCall(this.props.groupID),
                })
  }

render(){

  let avatar_url = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'


  // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
  if (
    !(
      this.state.dataKey in
      this.props.contracts["Togethers"]["mappProfileInGroup"]

      &&

      this.state.dataKey1 in
      this.props.contracts["Togethers"]["mappNbDemandsInGroup"]
    )
  ) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

    var displayData = this.props.contracts["Togethers"]["mappProfileInGroup"][this.state.dataKey].value;
    var nbDemands = this.props.contracts["Togethers"]["mappNbDemandsInGroup"][this.state.dataKey1].value;

let owner = new Boolean(displayData[3])
let open = new Boolean(displayData[1])

if ( this.props.type === "1" )
{
if ( owner == true )
{
  if ( open == true )
  {
    return (
      <View style={{ flex: 1, flexDirection: 'row'}}>
      <View style={{ flex: 1 }}><UserAvatar src={this.props.src}  size="30" name={nbDemands} /></View>
      <View style={{ flex: 9 }}><Text style={styles.label2}>{this.props.pseudo}</Text></View>
        <View style={{ flex: 1 }}><Badge status="primary"
        containerStyle={{ position: 'absolute', top: +14, right: +0 }}/></View>
        <View style={{ flex: 1 }}><Badge status="success"
        containerStyle={{ position: 'absolute', top: +14, right: +10 }}/></View>
        </View>
  )
  }
  else{
    return (
      <View style={{ flex: 1, flexDirection: 'row'}}>
      <View style={{ flex: 1 }}><UserAvatar src={this.props.src}  size="30" name={nbDemands} /></View>
      <View style={{ flex: 9 }}><Text style={styles.label2}>{this.props.pseudo}</Text></View>
        <View style={{ flex: 1 }}><Badge status="primary"
        containerStyle={{ position: 'absolute', top: +14, right: +0 }}/></View>

        </View>
  )
  }
}
if ( open == true )
{
  return (
    <View style={{ flex: 1, flexDirection: 'row'}}>
    <View style={{ flex: 1 }}><UserAvatar src={this.props.src}  size="30" name={nbDemands} /></View>
    <View style={{ flex: 9 }}><Text style={styles.label2}>{this.props.pseudo}</Text></View>
      <View style={{ flex: 1 }}><Badge status="success"
      containerStyle={{ position: 'absolute', top: +14, right: +10 }}/></View>
      </View>
)
}
else{
  return (
    <View style={{ flex: 1, flexDirection: 'row'}}>
    <View style={{ flex: 1 }}><UserAvatar src={this.props.src}  size="30" name={nbDemands} /></View>
    <View style={{ flex: 9 }}><Text style={styles.label2}>{this.props.pseudo}</Text></View>
</View>)
}
}

else
{
if ( owner == true )
{
  if ( open == true )
  {
    return (
      <View style={{ flex: 1, flexDirection: 'row'}}>
      <View style={{ flex: 1 }}><UserAvatar src={this.props.src}  size="30" name={this.props.name} /></View>
      <View style={{ flex: 9 }}><Text style={styles.label2}>{this.props.pseudo}</Text></View>
        <View style={{ flex: 1 }}><Badge status="primary"
        containerStyle={{ position: 'absolute', top: +14, right: +0 }}/></View>
        <View style={{ flex: 1 }}><Badge status="success"
        containerStyle={{ position: 'absolute', top: +14, right: +10 }}/></View>
        </View>
  )
  }
  else{
    return (
      <View style={{ flex: 1, flexDirection: 'row'}}>
      <View style={{ flex: 1 }}><UserAvatar src={this.props.src}  size="30" name={this.props.name} /></View>
      <View style={{ flex: 9 }}><Text style={styles.label2}>{this.props.pseudo}</Text></View>
        <View style={{ flex: 1 }}><Badge status="primary"
        containerStyle={{ position: 'absolute', top: +14, right: +0 }}/></View>

        </View>
  )
  }
}
if ( open == true )
{
  return (
    <View style={{ flex: 1, flexDirection: 'row'}}>
    <View style={{ flex: 1 }}><UserAvatar src={this.props.src}  size="30" name={this.props.name} /></View>
    <View style={{ flex: 9 }}><Text style={styles.label2}>{this.props.pseudo}</Text></View>
      <View style={{ flex: 1 }}><Badge status="success"
      containerStyle={{ position: 'absolute', top: +14, right: +10 }}/></View>
      </View>
)
}
else{
  return (
    <View style={{ flex: 1, flexDirection: 'row'}}>
    <View style={{ flex: 1 }}><UserAvatar src={this.props.src}  size="30" name={this.props.name} /></View>
    <View style={{ flex: 9 }}><Text style={styles.label2}>{this.props.pseudo}</Text></View>
</View>)
}
}

}
}

Description.contextTypes = {
  drizzle: PropTypes.object,
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
  };
};

export default drizzleConnect(Description, mapStateToProps);
