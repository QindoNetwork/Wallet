import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import PropTypes from "prop-types";
import signer from "../signer";

class Welcome extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey1: null,
      dataKey2: null,
      dataKey3: null,
    };
  }

  componentDidMount() {

this.setState({

      dataKey1: this.contracts["Togethers"].methods["mappAddressToUser"].cacheCall(signer),
      dataKey2: this.contracts["Togethers"].methods["getGroupsLength"].cacheCall({from: signer}),
      dataKey3: this.contracts["TogethersCoin"].methods["balanceOf"].cacheCall(signer),

             })
  }

  render() {
    // Contract is not yet intialized.
    if (!this.props.contracts["Togethers"].initialized) {
      return  <p> Loading... </p>;
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if (
      !(
        this.state.dataKey1 in
        this.props.contracts["Togethers"]["mappAddressToUser"]

        &&

        this.state.dataKey2 in
        this.props.contracts["Togethers"]["getGroupsLength"]

        &&

        this.state.dataKey3 in
        this.props.contracts["TogethersCoin"]["balanceOf"]

      )
    ) {
      return <p> Loading... </p>
      }

    var displayData1 = this.props.contracts["Togethers"]["mappAddressToUser"][this.state.dataKey1].value;
    var displayData2 = this.props.contracts["Togethers"]["getGroupsLength"][this.state.dataKey2].value;
    var displayData4 = this.props.contracts["TogethersCoin"]["balanceOf"][this.state.dataKey3].value;

    var balance = this.props.accountBalances[signer];

    var max = 200;

    {

      return (
      <p> BBBB </p>)

    }
}
}

Welcome.contextTypes = {
  drizzle: PropTypes.object,
};
/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
    accountBalances: state.accountBalances,
  };
};

export default drizzleConnect(Welcome, mapStateToProps);
