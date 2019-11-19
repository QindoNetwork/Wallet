import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import { togethersInstance, signer } from '../../options'

export default class ChangeTGCTPrice extends Component {

  constructor() {
    super();
    this.state = {
      getAdminGroups: [],
      membre: '',
      pseudo1: '',
      groupe: ''
    };
    this._ajouterMembre = this._ajouterMembre.bind(this)
  }

  handleChange = name => event => {
   this.setState({ [name]: event.target.value });
 };

  async componentDidMount() {

    let copy2 = []
    let list2 = await contractInstance.getOwnedGroupe()
    for (let j=0; j<list2.length; j++){
      copy2.push(await contractInstance.getNomGroupe(list2[j]))
    }

    this.setState({
                  getAdminGroups : copy2})

  }

  async _ajouterMembre() {
      await window.ethereum.enable()
     	await contractInstance.ajouterMembre(this.state.membre,this.state.groupe,this.state.pseudo1)
  }



import styles from '../Styles'

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

 async componentDidMount() {

this.setState({

      dataKey1: await contractInstance.mappAddressToUser(),
      dataKey2: await contractInstance.getGroupsLength(),
      dataKey3: await contractInstance.balanceOf(),

             })
  }

  render() {

    var displayData1 = this.state.dataKey1;
    var displayData2 = this.state.dataKey2;
    var displayData4 = this.state.dataKey3;

    var balance = this.props.accountBalances[signer];
    var max = 200;

    <div className="table-responsive w3-card-4">
      <table className="table table-bordered">
        <thead>
          <tr className="w3-theme-d4">
            <th>WELCOME</th>
          </tr>
        </thead>
          <tbody>
          <tr>
          <td>
            <Grid container spacing={24}>
              <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    required
                    label="NOM DU NOUVEAU GROUPE A CREER"
                    fullWidth
                    value={this.state.nom}
                    onChange={this.handleChange('nom')}
                    helperText="Ce nom doit être unique"
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    required
                    label="VOTRE PSEUDONYME DANS CE GROUPE"
                    fullWidth
                    value={this.state.pseudo}
                    onChange={this.handleChange('pseudo')}
                    helperText="Doit être unique"
                  />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <button className="btn-primary btn-block" onClick={this._creerGroupe}>PAYER</button>
                  </Grid>
                </Grid>
              </td>
          </tr>

  </tbody>
  </table>
  </div>

    if (displayData1[3] != 0) {

      return (
        <View style={styles.inputWrapper}>
        <View style={styles.inputWrapper}>
        <Text style={styles.screenTitle}>
          Welcome
        </Text>
        <Text style={styles.screenTitle}>
          {displayData1[1]}
        </Text>
        <Text style={styles.screenTitle}>
          {this.props.balance}
        </Text>
        <Text style={styles.label}>{displayData4}</Text>
        </View>
<View style={styles.inputWrapper}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('GroupsScreen',
            {
              name: displayData1[0],
              language: displayData1[1],
              account: this.props.account,
              getGroupsLength: displayData2,
              balance: this.props.balance,
              max: max
              })
            }>
            <Text style={styles.label}>CONTINUE WITH THIS ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('LanguagesScreen',
              {

              account: this.props.account,
              name: displayData1[0],
              pseudo: displayData1[1],
              language: displayData1[3],
              ipfs: displayData1[2],

              })
            }>
            <Text style={styles.label}>CHANGE PARAMETERS</Text>
        </TouchableOpacity>
        </View>
</View>

      );
    }

    else {

      return (

        <View style={styles.inputWrapper}>

          <Text style={styles.screenTitle}>
            ENTER INTO THE COMMUNITY
          </Text>
          <Text style={styles.label}>
            {this.props.account}
          </Text>
          <Text style={styles.label}>
            {this.props.balance}
          </Text>

          <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('LanguagesScreen',
                {

                account: this.props.account,
                name: "",
                pseudo: "",
                language: "",
                ipfs: "",

                })
              }>
              <Text style={styles.label}>CREATE USER</Text>
          </TouchableOpacity>

        </View>
      );
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
