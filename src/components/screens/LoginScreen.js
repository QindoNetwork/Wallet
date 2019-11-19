import React, { Component } from "react";
import Welcome from "../Welcome";

class LoginScreen extends Component {

  render() {

    return (

      <div>
        <Card className="card">
          <CardContent>
            <Welcome balance={this.props.balance} account={this.props.account}/>
          </CardContent>
        </Card>
    </div >

    );
  }
}
