import React, { Component } from "react"
import { CssBaseline, Grid, Card, CardContent } from "@material-ui/core"
import Menu from './components/Menu';

import ApproveSociety from './components/admin/ApproveSociety';
import BlackListSociety from './components/admin/BlackListSociety';
import ChangeTGCTPrice from './components/admin/ChangeTGCTPrice';
import CurrentDemands from './components/admin/CurrentDemands';
import PutTGCT from './components/admin/PutTGCT';

import BuySpaces from './components/Partner/BuySpaces';
import BuyTGTC from './components/Partner/BuyTGTC';
import GetSpaceAvailability from './components/Partner/GetSpaceAvailability';
import ModifySpace from './components/Partner/ModifySpace';
import MySpaces from './components/Partner/MySpaces';

import ApplyState from './components/Register/ApplyState';
import RegisterSociety from './components/Register/RegisterSociety';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.png'
import "../../App.css"


export default class App extends Component {
  render() {

    return (

      <React.Fragment>
        <CssBaseline />

          <div className="header">
            <div className="container_logo">
              <div className="logo">
                <img className="img_logo" src={ logo } alt="" />
              </div>

              <div className="UNION">
                <h1>ETHER UNION</h1>
              </div>

              <div className="commentStyle">
                Send or receive ethers, stay connected with yours and earn tokens,
                enter in a new social network system of consuming and play to our super lotery
              </div>

            </div>
          </div>


          <div className="main_content">

            <Grid container alignItems="center" justify="center">
              <Grid item xs={8} lg={10} >
                <Router>
                  <Route exact path="/" component={register}/>
                  <Route exact path="/partner" component={partner}/>
                  <Route exact path="/admin" component={admin}/>
                </Router>
              </Grid>
            </Grid>
          </div >

      </React.Fragment>
    )
  }
}

class admin extends Component {
  render() {
      return (
        <div>
          <Card className="card">
            <CardContent>
              <ApproveSociety />
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <BlackListSociety />
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <ChangeTGCTPrice />
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <CurrentDemands />
            </CardContent>
          </Card>
        </div >
    )
  }
}

class partner extends Component {
  render() {
      return (
        <div>
          <Card className="card">
            <CardContent>
              <BuySpaces />
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <BuyTGTC />
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <GetSpaceAvailability />
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <ModifySpace />
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <MySpaces />
            </CardContent>
          </Card>
      </div >
    )
  }
}

class register extends Component {
  render() {
      return (
        <div>
          <Card className="card">
            <CardContent>
              <ApplyState />
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <RegisterSociety />
            </CardContent>
          </Card>
      </div >
    )
  }
}
