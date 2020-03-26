import { ethers } from 'ethers';

const NETWORK_KEY = 'ropsten';
//const NETWORK_KEY = 'mainnet';

const INFURA_API_KEY = 'e2e065db32194d41a918e9f953789317';

const INFURA_URL = 'http://ropsten.infura.io/v3/';
//const INFURA_URL = 'https://mainnet.infura.io/v3/';

const infuraProvider = new ethers.providers.InfuraProvider(NETWORK_KEY);

const etherscanProvider = new ethers.providers.EtherscanProvider(NETWORK_KEY);

const togethersProvider = new ethers.providers.JsonRpcProvider(INFURA_URL + INFURA_API_KEY, NETWORK_KEY);

export const fallbackProvider = new ethers.providers.FallbackProvider([
    togethersProvider,
    infuraProvider,
    etherscanProvider,
  ])
