import React, { Component } from "react"
import { CssBaseline, Grid, Card, CardContent } from "@material-ui/core"

import Welcome from '../Welcome';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from '../../logo.png'
import "../../App.css"


export default class AppNavigation extends Component {
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
                  <Route exact path="/" component={Login}/>
                </Router>
              </Grid>
            </Grid>
          </div >

      </React.Fragment>
    )
  }
}

class Login extends Component {
  render() {
      return (
        <div>
          <Card className="card">
            <CardContent>
              <Welcome />
            </CardContent>
          </Card>
      </div >
    )
  }
}
