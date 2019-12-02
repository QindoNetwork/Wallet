const assert = require('assert');
const HDWalletProvider = require("truffle-hdwallet-provider");

const gasLimit = 10000000

require('dotenv').config({ path: require('path').join(__dirname, '.env') });

assert(process.env.INFURA_API_TOKEN, 'missing INFURA_API_TOKEN in .env file');
assert(process.env.HD_WALLET_MNEMONIC, 'missing HD_WALLET_MNEMONIC in .env file');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        process.env.HD_WALLET_MNEMONIC,
        `https://ropsten.infura.io/${process.env.INFURA_API_TOKEN}`,
      ),
      gas: gasLimit,
      gasPrice: 17e9,
      network_id: 3,
      skipDryRun: true
    },
    mainnet: {
      provider: () => new HDWalletProvider(
        process.env.HD_WALLET_MNEMONIC,
        `https://mainnet.infura.io/${process.env.INFURA_API_TOKEN}`,
      ),
      gas: gasLimit,
      gasPrice: 10e9,
      network_id: 1,
    },
  },
};
