import Togethers from "./contracts/Togethers.json";
import TogethersCoin from "./contracts/TogethersCoin.json";
import SpaceManager from "./contracts/SpaceManager.json";
import Web3 from "web3";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [Togethers, TogethersCoin, SpaceManager],
  events: {
    newDemand:      ["newDemand"],
    payDemand:      ["payDemand"],
    endDemand:      ["endDemand"],
  },
  polls: {
    // set polling interval to 30secs so we don't get buried in poll events
    accounts: 30000,
  },
};

export default options;
